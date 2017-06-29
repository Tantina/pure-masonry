let brickContainer;
let mason = {};
let timeout;
let is_moved;
let defaultOptions = {
  container: '#masonry-wall',
  width: 320,
  horizontal_gutter: 5,
  vertical_gutter: 5,
  responsive: true,
  transition: {
    duration: '350ms',
    easing: 'ease'
  },
  advanced: {
    centered: false
  }
};

module.exports = {
    init: function(config) {

        // default options if no config supplied
        let options = typeof config === 'undefined' ? defaultOptions : config;

        // select container to hold masonry
        brickContainer = typeof options.container === 'undefined' ? document.querySelector(defaultOptions.container) : document.querySelector(options.container);
        /*
         ** config values to overwrite if some of params are not supplied
         */
        let m_width = typeof options.width === 'undefined' ? defaultOptions.width : options.width;
        let m_hg = typeof options.horizontal_gutter === 'undefined' ? defaultOptions.horizontal_gutter : options.horizontal_gutter;
        let m_vg = typeof options.vertical_gutter === 'undefined' ? defaultOptions.vertical_gutter : options.vertical_gutter;
        let m_resp = typeof options.responsive === 'undefined' ? defaultOptions.responsive : options.responsive;
        let m_adv = typeof options.advanced === 'undefined' ? defaultOptions.advanced : options.advanced;

        // generate css to use in <style></style>
        let css = '#masonry-wall { overflow-y: auto; position: relative; overflow-x: hidden;} #masonry-wall > .brick { position: absolute;} #masonry-wall > .brick * {max-width: 100%;}';
        
        // responisve options 
        if(typeof options.transition !== 'undefined' && options.responsive) {

          // sdt transition
          let trsn = typeof options.transition.easing === 'undefined' ? 'ease' : options.transition.easing;

          // sdt easing
          let dur = typeof options.transition.duration === 'undefined' ? '350ms' : options.transition.duration;

          // add to style
          css += '#masonry-wall > .brick { transition: all '+dur+' '+trsn+'}';

          // update global timeout var with the one sent from config
          timeout = parseInt(dur);
        }

        // select head
        let head = document.head || document.getElementsByTagName('head')[0];

        // create style tag
        let style = document.createElement('style');

        // attribute text/css
        style.type = 'text/css';

        // more browser support
        if (style.styleSheet){
          style.styleSheet.cssText = css;
        } else {
          style.appendChild(document.createTextNode(css));
        }

        // append style tag with all the css
        head.appendChild(style);
        
        // build main config object
        mason = {
            options: {
                brickWidth: m_width,
                horizontalGutter: m_hg,
                verticalGutter: m_vg,
                underConstruction: m_resp
            },
            brickContainer: brickContainer,
            advanced: options.advanced
        };

        if(typeof options.onRebuild === 'function') {
          mason.onRebuild = options.onRebuild;
        }

        // on load build masonry
        window.onload = function() {
            
            build(mason.options);
            return;
        }
    }
};

let build = function(options) {

    //  get each brick
    let bricks = [];

    for (let brickIndex = 0; brickIndex < mason.brickContainer.children.length; brickIndex++) {
        let classNames = mason.brickContainer.children[brickIndex].className.split(' ');
        if (classNames.indexOf('brick') > -1) {
            mason.brickContainer.children[brickIndex].style.width = options.brickWidth + 'px';
            bricks.push(mason.brickContainer.children[brickIndex]);
        }
    }

    let grossWidth = options.brickWidth + options.horizontalGutter;

    //  calculate the number of bricks in each row
    let bricksPerRow = Math.floor(parseInt(mason.brickContainer.clientWidth) / grossWidth);

    //  initialise array to keep track of column height
    if (!Array.prototype.fill) {
      Object.defineProperty(Array.prototype, 'fill', {
        value: function(value) {

          // Steps 1-2.
          if (this == null) {
            throw new TypeError('this is null or not defined');
          }

          var O = Object(this);

          // Steps 3-5.
          var len = O.length >>> 0;

          // Steps 6-7.
          var start = arguments[1];
          var relativeStart = start >> 0;

          // Step 8.
          var k = relativeStart < 0 ?
            Math.max(len + relativeStart, 0) :
            Math.min(relativeStart, len);

          // Steps 9-10.
          var end = arguments[2];
          var relativeEnd = end === undefined ?
            len : end >> 0;

          // Step 11.
          var final = relativeEnd < 0 ?
            Math.max(len + relativeEnd, 0) :
            Math.min(relativeEnd, len);

          // Step 12.
          while (k < final) {
            O[k] = value;
            k++;
          }

          // Step 13.
          return O;
        }
      });
    }
    let columnHeight = Array(bricksPerRow).fill(0);

    //  populate first row starting with first (0th) brick
    let brickIndex = 0;
    for (let column = 0; column < bricksPerRow; column++) {
        if (brickIndex < bricks.length) {
            //  set coordinates for brick
            bricks[brickIndex].style.left = column * grossWidth + 'px';
            bricks[brickIndex].style.top = '0px';
            //  update the height of the column just appended
            columnHeight[column] = bricks[brickIndex].offsetHeight;
            brickIndex++;
        }
    }

    //  place remaining bricks
    while (brickIndex < bricks.length) {
        //  get shortest column
        let minColumnValue = Math.min.apply(Math, columnHeight);
        let minColumnKey;
        for (let column = 0; column < bricksPerRow; column++) {

            //  find the key for the minimum value
            if (columnHeight[column] === minColumnValue) {
                minColumnKey = column;
                //  use the leftmost in case several columns have the same height
                break;
            }
        }

        //  set coordinates for brick
        bricks[brickIndex].style.left = minColumnKey * grossWidth + 'px';
        bricks[brickIndex].style.top = columnHeight[minColumnKey] + options.verticalGutter + 'px';
        //  update the height of the column just appended
        columnHeight[minColumnKey] += bricks[brickIndex].offsetHeight + options.verticalGutter;
        brickIndex++;

    }

    if (typeof mason.advanced.centered !== 'undefined' && mason.advanced.centered === true) {
      let width = bricksPerRow * mason.options.brickWidth;
      brickContainer.style.width = width + (mason.options.horizontalGutter * bricksPerRow) + 'px';
      brickContainer.style.marginLeft = 'auto';
      brickContainer.style.marginRight = 'auto';
    }

    // if transition is setup need to wait until bricks are moved first then calc height
    setTimeout(function() {
      let combHeightOffsetValues = [];
      console.log('--here');

      for (let ind = 0; ind < bricks.length; ind++) {
          let css_decl = window.getComputedStyle(bricks[ind]);
          combHeightOffsetValues.push(parseInt(bricks[ind].getBoundingClientRect().top) + parseInt(css_decl.height));
      }
      // get height and add gutter
      let computedHeight = Math.max.apply(Math, combHeightOffsetValues) + mason.options.horizontalGutter;

      brickContainer.style.minHeight = computedHeight + 'px';
      computedHeight = 0;

      if(typeof mason.onRebuild === 'function') {
        mason.onRebuild();
      }

    },parseInt(timeout));

}

//  if browser is resized
window.onresize = function() {
    //  if masonry is not disabled
    if (mason.options.underConstruction) {
        
        let widthBefore = mason.brickContainer.clientWidth; //  get width before resizing
        //  if already called within last second, reset timer
        if (waitingForResize) {
            clearTimeout(waitingForResize);
        }
        let waitingForResize = setTimeout(function() {
            //  if container width has changed in the last second
            brickContainer.style.width = 'auto';
            if (widthBefore !== mason.brickContainer.clientWidth) {
                build(mason.options);
            }
        }, 300);
    }
};
