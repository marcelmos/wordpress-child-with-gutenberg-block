const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InspectorControls, ColorPalette } = wp.editor;
const { PanelBody, IconButton, RangeControl } = wp.components;
const { Fragment } = wp.element;


registerBlockType('mos/custom-slider', {
   // built-in attributes
   title: 'Custom slider',
   description: 'Block to generate custom slider with custom custom and amount of slides',
   icon: 'image-flip-horizontal',
   category: 'widgets',
   
   // custom attributes
    attributes: {
      header: {
         type: 'string',
         source: 'html',
         selector: 'h3',
      },
      content: {
         type: 'string',
         source: 'html',
         selector: 'p',
      },
      bgImage: {
      type: 'string',
      default: null,
      },
      iconImage: {
      type: 'string',
      default: null,
      },
      headerColor: {
         type: 'string',
         default: '#2D3236',
      },
      paragraphColor: {
         type: 'string',
         default: '#808080',
      },
      bgColor: {
         type: 'string',
         default: '#FFFFFF',
      },
      bgOverlayColor: {
         type: 'string',
         default: '#FFFFFF',
      },
      bgOverlayOpacity: {
         type: 'number',
         default: .2,
      },
      slidesAmount: {
         type: 'number',
         default: 3,
      },
    },

    
    
    
    // built-in functions
    edit({ attributes, setAttributes }){
      const { header, content, headerColor, paragraphColor, bgImage, bgColor, bgOverlayColor, bgOverlayOpacity, iconImage, slidesAmount } = attributes;

      // custom functions
      function onChangeHeader(newHeader) {
         setAttributes( { header: newHeader } );
      }
      function onChangeContent(newContent) {
         setAttributes( { content: newContent } );
      }
      function onHeaderColorChange(newColor){
         setAttributes( { headerColor: newColor } );
      }
      function onParagraphColorChange(newColor){
         setAttributes( { paragraphColor: newColor } );
      }
      function onSelectImage(newImage){
         setAttributes( { bgImage: newImage.sizes.full.url } );
      }
      function onSelectIcon(newIcon){
         setAttributes( { iconImage: newIcon.sizes.full.url } );
      }
      function onBackgroundColor(newBgColor) {
         setAttributes( { bgColor: newBgColor } );
      }
      function onOverlayColor(newOverlayColor) {
         setAttributes( { bgOverlayColor: newOverlayColor } );
      }
      function onOverlayOpacity( newValue ) { 
         setAttributes( { bgOverlayOpacity: (newValue/100) } );
      }

      // render in backend 
      return([
         <InspectorControls style={ { marginBottom: '40px' } }>
            <PanelBody title={ 'Slider Settings' }>
               <p><strong>Select Amount of Slides:</strong></p>
               <RangeControl
                  label="Columns"
                  value={ slidesAmount }
                  onChange={ ( newAmount ) => setAttributes( { slidesAmount: newAmount } ) }
                  min={ 3 }
                  max={ 99 }
                  />
            </PanelBody>

            <PanelBody title={ 'Font Color Settings' }>
               <p><strong>Select a Header color:</strong></p>
               <ColorPalette value={ headerColor }
                  onChange={ onHeaderColorChange } />

               <p><strong>Select a Paragraph color:</strong></p>
               <ColorPalette value={ paragraphColor }
                  onChange={ onParagraphColorChange } />
            </PanelBody>

            <PanelBody title={ 'Slide Background Color' }>
               <p><strong>Select a Slide color:</strong></p>
               <ColorPalette value={ bgColor }
                  onChange={ onBackgroundColor } />
            </PanelBody>

            <PanelBody title={ 'Slide Overlay Settings' }>
               <p><strong>Select a Overlay Color:</strong></p>
               <ColorPalette value={ bgColor }
                  onChange={ onOverlayColor } />

               <p><strong>Select a Overlay Opacity:</strong></p>
               <RangeControl
                  label="Columns"
                  value={ (bgOverlayOpacity*100) }
                  onChange={ onOverlayOpacity }
                  min={ 0 }
                  max={ 100 }
                  />
            </PanelBody>

            <PanelBody title={ 'Slide Background Image Settings' }>
                  <p><strong>Select a Background Image:</strong></p>
                  <MediaUpload onSelect={ onSelectImage }
                     type="image"
                     value={ bgImage }
                     render={ ( { open } ) => (
                        <IconButton onClick={ open }
                           icon="upload"
                           className="editor-media-placeholder__button is-button is-default is-large" >
                           Select Background Image
                        </IconButton>
                      ) } />
            </PanelBody>
         </InspectorControls>,

         <>
            <div className="custom-slider">
               <div className="custom-slider-container" style={ { position: "relative", width: '332px', height: '228px', backgroundColor: bgColor } }>
                  <div className="custom-slider__backgroun-overlay" style={ { backgroundColor: bgOverlayColor, opacity: bgOverlayOpacity, position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 10 } }></div>
                  <img src={bgImage} className="custom-slider__image" style={ { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 } } alt="" />
                  <div className="custom-slider__content" style={ { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, textAlign: "center", zIndex: 20, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" } }>
                     <RichText key="editable"
                        tagName="h3"
                        placeholder="Your slide header"
                        value={ header }
                        onChange={ onChangeHeader }
                        style={ {color: headerColor} }
                        />
                     <RichText key="editable"
                        tagName="p"
                        placeholder="Your slide content"
                        value={ content }
                        onChange={ onChangeContent }
                        style={ {color: paragraphColor} }
                        />
                     <img src={iconImage} className="custom-slider__icon" style={ { maxHeight: '42px', maxWidth: '42px' } } alt="" />
                  </div>
               </div>
               <MediaUpload onSelect={ onSelectImage }
                     type="image"
                     value={ bgImage }
                     render={ ( { open } ) => (
                        <IconButton onClick={ open }
                           icon="upload"
                           className="editor-media-placeholder__button is-button is-default is-large" >
                           Select Background Image
                        </IconButton>
                        ) } />
               <MediaUpload onSelect={ onSelectIcon }
                  type="image"
                  value={ iconImage }
                  render={ ( { open } ) => (
                     <IconButton onClick={ open }
                        icon="upload"
                        className="editor-media-placeholder__button is-button is-default is-large" >
                        Select Icon Image
                     </IconButton>
                     ) } />
            </div>
         </>
               
      ]);
   },

   save({ attributes }){
      // custom functions
      const { header, content, headerColor, paragraphColor, bgImage, bgColor, bgOverlayColor, bgOverlayOpacity, iconImage } = attributes;


      // render in frontend
      return(
         <div className="custom-slider-container" style={ { position: "relative", width: '332px', height: '228px', backgroundColor: bgColor } }>
            <div className="custom-slider__backgroun-overlay" style={ { backgroundColor: bgOverlayColor, opacity: bgOverlayOpacity, position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 10 } }></div>
            <img src={bgImage} className="custom-slider__image" style={ { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 } } alt="" />
            <div className="custom-slider__content" style={ { position: "absolute", top: 0, left: 0, right: 0, bottom: 0, textAlign: "center", zIndex: 20, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" } }>
               <h3 style={ {color: headerColor} }>{ header }</h3>
               <RichText.Content tagName="p"
                  value={ content }
                  style={ {color: paragraphColor} }
                  />
                  <img src={iconImage} className="custom-slider__icon" style={ { maxHeight: '42px', maxWidth: '42px' } } alt="" />
            </div>
         </div>
      );
   },
});