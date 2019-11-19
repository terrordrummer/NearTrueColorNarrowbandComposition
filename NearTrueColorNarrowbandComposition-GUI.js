// ****************************************************************************
// PixInsight JavaScript Runtime API - PJSR Version 1.0
// ****************************************************************************
// NearTrueColorNarrowbandComposition-GUI.js
// ****************************************************************************
//
// Copyright (C) 2019 Roberto Sartori. All Rights Reserved.
//
// Redistribution and use in both source and binary forms, with or without
// modification, is permitted provided that the following conditions are met:
//
// 1. All redistributions of source code must retain the above copyright
//    notice, this list of conditions and the following disclaimer.
//
// 2. All redistributions in binary form must reproduce the above copyright
//    notice, this list of conditions and the following disclaimer in the
//    documentation and/or other materials provided with the distribution.
//
// 3. Neither the names "PixInsight" and "Pleiades Astrophoto", nor the names
//    of their contributors, may be used to endorse or promote products derived
//    from this software without specific prior written permission. For written
//    permission, please contact info@pixinsight.com.
//
// 4. All products derived from this software, in any form whatsoever, must
//    reproduce the following acknowledgment in the end-user documentation
//    and/or other materials provided with the product:
//
//    "This product is based on software from the PixInsight project, developed
//    by Pleiades Astrophoto and its contributors (http://pixinsight.com/)."
//
//    Alternatively, if that is where third-party acknowledgments normally
//    appear, this acknowledgment must be reproduced in the product itself.
//
// THIS SOFTWARE IS PROVIDED BY PLEIADES ASTROPHOTO AND ITS CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
// TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
// PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL PLEIADES ASTROPHOTO OR ITS
// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
// EXEMPLARY OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, BUSINESS
// INTERRUPTION; PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; AND LOSS OF USE,
// DATA OR PROFITS) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.
// ****************************************************************************

/* beautify ignore:start */
#include "NearTrueColorNarrowbandComposition-GUIHelper.js"

#define GUI_LABEL_WIDTH    120
#define GUI_SECTION_BCK    218
#define GUI_SECTION_MARGIN 6
/* beautify ignore:end */

// The script's parameters dialog prototype.
function SNROptimizerDialog()
{
   this.__base__ = Dialog;
   this.__base__();

   this.windowTitle = TITLE;

   // ------------------------------------------------------------------------
   // Local vars
   // ------------------------------------------------------------------------
   engine = new SNROptimizerEngine();
   this.engine = engine;
   parameters = {};
   this.parameters = parameters;

   // ------------------------------------------------------------------------
   // Top Label
   // ------------------------------------------------------------------------
   var titlePane = new Label( this );
   with( titlePane )
   {
      frameStyle = FrameStyle_Box;
      margin = 4;
      wordWrapping = true;
      useRichText = true;
      text =
         "<p><b>" + TITLE + " Version " + VERSION + "</b> &mdash; " +
         "This script digests narrowband images taken with different astronomical filters \
            and creates an near-true colorized RGB image by properly composing and scaling each filtered image contribution. < br / > \
            Based on <i>CEDIC 2019: Creating near true color images for nebulae from narrow band data using PixInsight</i> \
            workshop by Edoardo Luca Radice.<br>\
            Copyright & copy; 2019 Edoardo Luca Radice, Roberto Sartori. All Rights Reserved.";
   }

   // ------------------------------------------------------------------------
   // Global Parameters
   // ------------------------------------------------------------------------
   var globalParametersBar = new SectionBar( this, "Global Parameters" );
   var globalParametersSection = new Control( globalParametersBar );
   with( globalParametersSection )
   {
      sizer = new VerticalSizer;
      sizer.spacing = 6;
      let labelWidth = GUI_LABEL_WIDTH * 1.4;

      // -------------------------------
      // Narrowband reference image selector
      // -------------------------------
      var narrowbandReferenceImageLabel = new Label( this );
      with( narrowbandReferenceImageLabel )
      {
         margin = 4;
         wordWrapping = true;
         useRichText = true;
         maxWidth = labelWidth;
         minWidth = labelWidth;
         text = "Narrowband reference image:";
      }

      var narrowbandReferenceImageList = new ComboBox( this );
      engine.referenceImageList().forEach( item => narrowbandReferenceImageList.addItem( item ) );
      narrowbandReferenceImageList.onViewSelected = function( view )
      {
         // TBD
      }

      var hSizer = new HorizontalSizer;
      with( hSizer )
      {
         spacing = 4 + 6;
         add( narrowbandReferenceImageLabel );
         add( narrowbandReferenceImageList, 100 );
      }
      sizer.add( hSizer );

      // -------------------------------
      // RGB reference image selector
      // -------------------------------
      var RGBReferenceImageLabel = new Label( this );
      with( RGBReferenceImageLabel )
      {
         margin = 4;
         wordWrapping = true;
         useRichText = true;
         maxWidth = labelWidth;
         minWidth = labelWidth;
         text = "RGB reference image:";
      }

      var RGBReferenceImageList = new ViewList( this );
      RGBReferenceImageList.getMainViews();
      narrowbandReferenceImageList.onViewSelected = function( view )
      {
         // TBD
      }

      var hSizer = new HorizontalSizer;
      with( hSizer )
      {
         spacing = 4 + 6;
         add( RGBReferenceImageLabel );
         add( RGBReferenceImageList, 100 );
      }
      sizer.add( hSizer );

      // -------------------------------
      // background reference region
      // -------------------------------
      var backgroundReferenceLabel = new Label( this );
      with( backgroundReferenceLabel )
      {
         margin = 4;
         wordWrapping = true;
         useRichText = true;
         maxWidth = labelWidth;
         minWidth = labelWidth;
         text = "Background reference region:";
      }

      var backgroundPreviewViewList = new ViewList( this );
      backgroundPreviewViewList.getPreviews();
      engine.parameters.backgroundPreview = backgroundPreviewViewList.currentView;
      backgroundPreviewViewList.onViewSelected = function( view )
      {
         // TBD
      }

      var hSizer = new HorizontalSizer;
      with( hSizer )
      {
         spacing = 4 + 6;
         add( backgroundReferenceLabel );
         add( backgroundPreviewViewList, 100 );
      }
      sizer.add( hSizer );

      // -------------------------------
      // Sensor Selection
      // -------------------------------

      cameraSensorSelectionLabel = new Label( this );
      with( cameraSensorSelectionLabel )
      {
         margin = 4;
         wordWrapping = true;
         useRichText = true;
         maxWidth = labelWidth;
         minWidth = labelWidth;
         text = "Camera sensor:";
      }

      this.cameraSensorComboBox = new ComboBox( this );
      this.cameraSensorComboBox.margin = 4;
      let names = engine.cameraSensorNames();
      names.forEach( item => this.cameraSensorComboBox.addItem( item ) );
      this.cameraSensorComboBox.onItemSelected = function( index )
      {
         engine.setCameraSensorFromIndex( index );
         this.updateControls();
      };

      hSizer = new HorizontalSizer;
      with( hSizer )
      {
         spacing = 4 + 6;
         add( cameraSensorSelectionLabel );
         add( this.cameraSensorComboBox, 100 );
      }
      sizer.add( hSizer );
   }
   globalParametersBar.setSection( globalParametersSection );

   // ------------------------------------------------------------------------
   // H-alpha Parameters
   // ------------------------------------------------------------------------
   var hAlphaParametersBar = new SectionBar( this, "Hydrogen-alpha (H-α)" );
   var hAlphaParametersSection = new Control( hAlphaParametersBar );
   with( hAlphaParametersSection )
   {
      sizer = new VerticalSizer;
      sizer.spacing = 6;
      sizer.margin = GUI_SECTION_MARGIN;
      backgroundColor = Color.rgbaColor( GUI_SECTION_BCK, GUI_SECTION_BCK, GUI_SECTION_BCK );

      // -------------------------------
      //       Halpha image
      // -------------------------------
      var hAlphaPreviewLabel = new Label( this );
      with( hAlphaPreviewLabel )
      {
         margin = 4;
         wordWrapping = true;
         useRichText = true;
         maxWidth = GUI_LABEL_WIDTH;
         minWidth = GUI_LABEL_WIDTH;
         text = "Narrowband image:";
      }

      var hAlphaPreviewViewList = new ViewList( this );
      hAlphaPreviewViewList.getMainViews();
      hAlphaPreviewViewList.onViewSelected = function( view )
      {
         // set H-alpha preview ID
      }

      hSizer = new HorizontalSizer;
      with( hSizer )
      {
         spacing = 4;
         add( hAlphaPreviewLabel );
         add( hAlphaPreviewViewList, 100 );
      }
      sizer.add( hSizer );

      // -------------------------------
      //       Halpha efficiency
      // -------------------------------

      var hAlphaEfficiencyLabel = new Label( this );
      with( hAlphaEfficiencyLabel )
      {
         margin = 4;
         wordWrapping = true;
         useRichText = true;
         maxWidth = GUI_LABEL_WIDTH - 4;
         minWidth = GUI_LABEL_WIDTH - 4;
         text = "Sensor Efficiency:";
      }

      this.hAlphaEfficiencyControl = new NumericControl( this );
      with( this.hAlphaEfficiencyControl )
      {
         label.text = "";
         label.minWidth = 0;
         label.maxWidth = 0;
         setRange( 0, 1 );
         slider.setRange( 0, 1000 );
         slider.scaledMinWidth = 40;
         setPrecision( 2 );
         setValue( 0 );
         toolTip = "<p>TBD</p>";
      }
      this.hAlphaEfficiencyControl.onValueUpdated = ( value ) =>
      {
         // update quantum efficiency
      };

      hSizer = new HorizontalSizer;
      with( hSizer )
      {
         spacing = 4;
         add( hAlphaEfficiencyLabel );
         add( this.hAlphaEfficiencyControl, 100 );
      }
      sizer.add( hSizer );

      // -------------------------------
      //       Halpha exposure
      // -------------------------------

      var hAlphaExposureLabel = new Label( this );
      with( hAlphaExposureLabel )
      {
         margin = 4;
         wordWrapping = true;
         useRichText = true;
         maxWidth = GUI_LABEL_WIDTH;
         minWidth = GUI_LABEL_WIDTH;
         text = "Exposure (s):";
      }

      this.hAlphaExposureSpinBox = new SpinBox( this );
      this.hAlphaExposureSpinBox.minValue = 0;
      this.hAlphaExposureSpinBox.maxValue = 3600;
      this.hAlphaExposureSpinBox.setFixedWidth( 60 );
      this.hAlphaExposureSpinBox.toolTip = "<p></p>";
      this.hAlphaExposureSpinBox.onValueUpdated = function( value )
      {
         // TBD
      };

      hSizer = new HorizontalSizer;
      with( hSizer )
      {
         spacing = 4;
         add( hAlphaExposureLabel );
         add( this.hAlphaExposureSpinBox );
         add( new Label );
      }
      sizer.add( hSizer );
   }
   hAlphaParametersBar.setSection( hAlphaParametersSection );

   // -------------------------------
   // H-beta
   // -------------------------------
   var hBetaParametersBar = new SectionBar( this, "Hydrogen-beta (H-β)" );
   var hBetaParametersSection = new Control( hBetaParametersBar );
   with( hBetaParametersSection )
   {
      sizer = new VerticalSizer;
      sizer.spacing = 6;
      sizer.margin = GUI_SECTION_MARGIN;
      backgroundColor = Color.rgbaColor( GUI_SECTION_BCK, GUI_SECTION_BCK, GUI_SECTION_BCK );

      // -------------------------------
      //       Hbeta synthetic
      // -------------------------------
      var hBetaSyntheticLabel = new Label( this );
      with( hBetaSyntheticLabel )
      {
         margin = 4;
         wordWrapping = true;
         useRichText = true;
         maxWidth = GUI_LABEL_WIDTH;
         minWidth = GUI_LABEL_WIDTH;
         text = "";
      }

      this.hBetaSyntheticCheckBox = new CheckBox( this );
      this.hBetaSyntheticCheckBox.text = "Use synthetic H-β";
      this.hBetaSyntheticCheckBox.toolTip = "<p>Apply overscan correction.</p>";
      this.hBetaSyntheticCheckBox.onCheck = function( checked )
      {
         // update synthetic H-beta checkbox
      };

      hSizer = new HorizontalSizer;
      with( hSizer )
      {
         spacing = 4;
         add( hBetaSyntheticLabel );
         add( this.hBetaSyntheticCheckBox, 100 );
      }
      sizer.add( hSizer );

      // -------------------------------
      //       Hbeta balmer decrement
      // -------------------------------

      var hBetaBalmerDecrementLabel = new Label( this );
      with( hBetaBalmerDecrementLabel )
      {
         margin = 4;
         wordWrapping = true;
         useRichText = true;
         maxWidth = GUI_LABEL_WIDTH - 4;
         minWidth = GUI_LABEL_WIDTH - 4;
         text = "Balmer decrement:";
      }

      this.hBetaBalmerDecrementControl = new NumericControl( this );
      with( this.hBetaBalmerDecrementControl )
      {
         label.text = "";
         label.minWidth = 0;
         label.maxWidth = 0;
         setRange( 0.1, 0.4 );
         slider.setRange( 0, 1000 );
         slider.scaledMinWidth = 40;
         setPrecision( 2 );
         setValue( 0 );
         toolTip = "<p>TBD</p>";
      }
      this.hBetaBalmerDecrementControl.onValueUpdated = ( value ) =>
      {
         // update quantum efficiency
      };

      hSizer = new HorizontalSizer;
      with( hSizer )
      {
         spacing = 4;
         add( hBetaBalmerDecrementLabel );
         add( this.hBetaBalmerDecrementControl, 100 );
      }
      sizer.add( hSizer );

      // -------------------------------
      //       Hbeta image
      // -------------------------------
      var hBetaPreviewLabel = new Label( this );
      with( hBetaPreviewLabel )
      {
         margin = 4;
         wordWrapping = true;
         useRichText = true;
         maxWidth = GUI_LABEL_WIDTH;
         minWidth = GUI_LABEL_WIDTH;
         text = "Narrowband image:";
      }

      var hBetaPreviewViewList = new ViewList( this );

      hBetaPreviewViewList.getMainViews();
      hBetaPreviewViewList.onViewSelected = function( view )
      {
         // set H-beta preview ID
      }

      hSizer = new HorizontalSizer;
      with( hSizer )
      {
         spacing = 4;
         add( hBetaPreviewLabel );
         add( hBetaPreviewViewList, 100 );
      }
      sizer.add( hSizer );

      // -------------------------------
      //       Hbeta efficiency
      // -------------------------------

      var hBetaEfficiencyLabel = new Label( this );
      with( hBetaEfficiencyLabel )
      {
         margin = 4;
         wordWrapping = true;
         useRichText = true;
         maxWidth = GUI_LABEL_WIDTH - 4;
         minWidth = GUI_LABEL_WIDTH - 4;
         text = "Sensor Efficiency:";
      }

      this.hBetaEfficiencyControl = new NumericControl( this );
      with( this.hBetaEfficiencyControl )
      {
         label.text = "";
         label.minWidth = 0;
         label.maxWidth = 0;
         setRange( 0, 1 );
         slider.setRange( 0, 1000 );
         slider.scaledMinWidth = 40;
         setPrecision( 2 );
         setValue( 0 );
         toolTip = "<p>TBD</p>";
      }
      this.hBetaEfficiencyControl.onValueUpdated = ( value ) =>
      {
         // update quantum efficiency
      };

      hSizer = new HorizontalSizer;
      with( hSizer )
      {
         spacing = 4;
         add( hBetaEfficiencyLabel );
         add( this.hBetaEfficiencyControl, 100 );
      }
      sizer.add( hSizer );

      // -------------------------------
      //       Hbeta exposure
      // -------------------------------

      var hBetaExposureLabel = new Label( this );
      with( hBetaExposureLabel )
      {
         margin = 4;
         wordWrapping = true;
         useRichText = true;
         maxWidth = GUI_LABEL_WIDTH;
         minWidth = GUI_LABEL_WIDTH;
         text = "Exposure (s):";
      }

      this.hBetaExposureSpinBox = new SpinBox( this );
      this.hBetaExposureSpinBox.minValue = 0;
      this.hBetaExposureSpinBox.maxValue = 3600;
      this.hBetaExposureSpinBox.setFixedWidth( 60 );
      this.hBetaExposureSpinBox.toolTip = "<p></p>";
      this.hBetaExposureSpinBox.onValueUpdated = function( value )
      {
         // TBD
      };

      hSizer = new HorizontalSizer;
      with( hSizer )
      {
         spacing = 4;
         add( hBetaExposureLabel );
         add( this.hBetaExposureSpinBox );
         add( new Label );
      }
      sizer.add( hSizer );
   }
   hBetaParametersBar.setSection( hBetaParametersSection );

   // -------------------------------
   // O3
   // -------------------------------
   var o3ParametersBar = new SectionBar( this, "Oxygen (OIII)" );
   var o3ParametersSection = new Control( o3ParametersBar );
   with( o3ParametersSection )
   {
      sizer = new VerticalSizer;
      sizer.spacing = 6;
      sizer.margin = GUI_SECTION_MARGIN;
      backgroundColor = Color.rgbaColor( GUI_SECTION_BCK, GUI_SECTION_BCK, GUI_SECTION_BCK );

      var o3PreviewLabel = new Label( this );
      with( o3PreviewLabel )
      {
         margin = 4;
         wordWrapping = true;
         useRichText = true;
         maxWidth = GUI_LABEL_WIDTH;
         minWidth = GUI_LABEL_WIDTH;
         text = "Narrowband image:";
      }

      var o3PreviewViewList = new ViewList( this );

      o3PreviewViewList.getMainViews();
      o3PreviewViewList.onViewSelected = function( view )
      {
         // set O3 preview ID
      }

      hSizer = new HorizontalSizer;
      with( hSizer )
      {
         spacing = 4;
         add( o3PreviewLabel );
         add( o3PreviewViewList, 100 );
      }
      sizer.add( hSizer );

      // -------------------------------
      //       O3 efficiency
      // -------------------------------

      var o3EfficiencyLabel = new Label( this );
      with( o3EfficiencyLabel )
      {
         margin = 4;
         wordWrapping = true;
         useRichText = true;
         maxWidth = GUI_LABEL_WIDTH - 4;
         minWidth = GUI_LABEL_WIDTH - 4;
         text = "Sensor Efficiency:";
      }

      this.o3EfficiencyControl = new NumericControl( this );
      with( this.o3EfficiencyControl )
      {
         label.text = "";
         label.minWidth = 0;
         label.maxWidth = 0;
         setRange( 0, 1 );
         slider.setRange( 0, 1000 );
         slider.scaledMinWidth = 40;
         setPrecision( 2 );
         setValue( 0 );
         toolTip = "<p>TBD</p>";
      }
      this.o3EfficiencyControl.onValueUpdated = ( value ) =>
      {
         // update quantum efficiency
      };

      hSizer = new HorizontalSizer;
      with( hSizer )
      {
         spacing = 4;
         add( o3EfficiencyLabel );
         add( this.o3EfficiencyControl, 100 );
      }
      sizer.add( hSizer );

      // -------------------------------
      //       O3 exposure
      // -------------------------------

      var o3ExposureLabel = new Label( this );
      with( o3ExposureLabel )
      {
         margin = 4;
         wordWrapping = true;
         useRichText = true;
         maxWidth = GUI_LABEL_WIDTH;
         minWidth = GUI_LABEL_WIDTH;
         text = "Exposure (s):";
      }

      this.o3ExposureSpinBox = new SpinBox( this );
      this.o3ExposureSpinBox.minValue = 0;
      this.o3ExposureSpinBox.maxValue = 3600;
      this.o3ExposureSpinBox.setFixedWidth( 60 );
      this.o3ExposureSpinBox.toolTip = "<p></p>";
      this.o3ExposureSpinBox.onValueUpdated = function( value )
      {
         // TBD
      };

      hSizer = new HorizontalSizer;
      with( hSizer )
      {
         spacing = 4;
         add( o3ExposureLabel );
         add( this.o3ExposureSpinBox );
         add( new Label );
      }
      sizer.add( hSizer );
   }
   o3ParametersBar.setSection( o3ParametersSection );

   // -------------------------------
   // S2
   // -------------------------------
   var s2ParametersBar = new SectionBar( this, "Sulphur (SII)" );
   var s2ParametersSection = new Control( s2ParametersBar );
   with( s2ParametersSection )
   {
      sizer = new VerticalSizer;
      sizer.spacing = 6;
      sizer.margin = GUI_SECTION_MARGIN;
      backgroundColor = Color.rgbaColor( GUI_SECTION_BCK, GUI_SECTION_BCK, GUI_SECTION_BCK );

      var s2PreviewLabel = new Label( this );
      with( s2PreviewLabel )
      {
         margin = 4;
         wordWrapping = true;
         useRichText = true;
         maxWidth = GUI_LABEL_WIDTH;
         minWidth = GUI_LABEL_WIDTH;
         text = "Narrowband image:";
      }

      var s2PreviewViewList = new ViewList( this );

      s2PreviewViewList.getMainViews();
      s2PreviewViewList.onViewSelected = function( view )
      {
         // set S2 preview ID
      }

      hSizer = new HorizontalSizer;
      with( hSizer )
      {
         spacing = 4;
         add( s2PreviewLabel );
         add( s2PreviewViewList, 100 );
      }
      sizer.add( hSizer );

      // -------------------------------
      //       S2 efficiency
      // -------------------------------

      var s2EfficiencyLabel = new Label( this );
      with( s2EfficiencyLabel )
      {
         margin = 4;
         wordWrapping = true;
         useRichText = true;
         maxWidth = GUI_LABEL_WIDTH - 4;
         minWidth = GUI_LABEL_WIDTH - 4;
         text = "Sensor Efficiency:";
      }

      this.s2EfficiencyControl = new NumericControl( this );
      with( this.s2EfficiencyControl )
      {
         label.text = "";
         label.minWidth = 0;
         label.maxWidth = 0;
         setRange( 0, 1 );
         slider.setRange( 0, 1000 );
         slider.scaledMinWidth = 40;
         setPrecision( 2 );
         setValue( 0 );
         toolTip = "<p>TBD</p>";
      }
      this.s2EfficiencyControl.onValueUpdated = ( value ) =>
      {
         // update quantum efficiency
      };

      hSizer = new HorizontalSizer;
      with( hSizer )
      {
         spacing = 4;
         add( s2EfficiencyLabel );
         add( this.s2EfficiencyControl, 100 );
      }
      sizer.add( hSizer );

      // -------------------------------
      //       S2 exposure
      // -------------------------------

      var s2ExposureLabel = new Label( this );
      with( s2ExposureLabel )
      {
         margin = 4;
         wordWrapping = true;
         useRichText = true;
         maxWidth = GUI_LABEL_WIDTH;
         minWidth = GUI_LABEL_WIDTH;
         text = "Exposure (s):";
      }

      this.s2ExposureSpinBox = new SpinBox( this );
      this.s2ExposureSpinBox.minValue = 0;
      this.s2ExposureSpinBox.maxValue = 3600;
      this.s2ExposureSpinBox.setFixedWidth( 60 );
      this.s2ExposureSpinBox.toolTip = "<p></p>";
      this.s2ExposureSpinBox.onValueUpdated = function( value )
      {
         // TBD
      };

      hSizer = new HorizontalSizer;
      with( hSizer )
      {
         spacing = 4;
         add( s2ExposureLabel );
         add( this.s2ExposureSpinBox );
         add( new Label );
      }
      sizer.add( hSizer );
   }
   s2ParametersBar.setSection( s2ParametersSection );

   // -------------------------------
   // N2
   // -------------------------------
   var n2ParametersBar = new SectionBar( this, "Nitrogen (NII)" );
   var n2ParametersSection = new Control( n2ParametersBar );
   with( n2ParametersSection )
   {
      sizer = new VerticalSizer;
      sizer.spacing = 6;
      sizer.margin = GUI_SECTION_MARGIN;
      backgroundColor = Color.rgbaColor( GUI_SECTION_BCK, GUI_SECTION_BCK, GUI_SECTION_BCK );

      var n2PreviewLabel = new Label( this );
      with( n2PreviewLabel )
      {
         margin = 4;
         wordWrapping = true;
         useRichText = true;
         maxWidth = GUI_LABEL_WIDTH;
         minWidth = GUI_LABEL_WIDTH;
         text = "Narrowband image:";
      }

      var n2PreviewViewList = new ViewList( this );

      n2PreviewViewList.getMainViews();
      n2PreviewViewList.onViewSelected = function( view )
      {
         // set N2 preview ID
      }

      hSizer = new HorizontalSizer;
      with( hSizer )
      {
         spacing = 4;
         add( n2PreviewLabel );
         add( n2PreviewViewList, 100 );
      }
      sizer.add( hSizer );

      // -------------------------------
      //       N2 efficiency
      // -------------------------------

      var n2EfficiencyLabel = new Label( this );
      with( n2EfficiencyLabel )
      {
         margin = 4;
         wordWrapping = true;
         useRichText = true;
         maxWidth = GUI_LABEL_WIDTH - 4;
         minWidth = GUI_LABEL_WIDTH - 4;
         text = "Sensor Efficiency:";
      }

      this.n2EfficiencyControl = new NumericControl( this );
      with( this.n2EfficiencyControl )
      {
         label.text = "";
         label.minWidth = 0;
         label.maxWidth = 0;
         setRange( 0, 1 );
         slider.setRange( 0, 1000 );
         slider.scaledMinWidth = 40;
         setPrecision( 2 );
         setValue( 0 );
         toolTip = "<p>TBD</p>";
      }
      this.n2EfficiencyControl.onValueUpdated = ( value ) =>
      {
         // update quantum efficiency
      };

      hSizer = new HorizontalSizer;
      with( hSizer )
      {
         spacing = 4;
         add( n2EfficiencyLabel );
         add( this.n2EfficiencyControl, 100 );
      }
      sizer.add( hSizer );

      // -------------------------------
      //       N2 exposure
      // -------------------------------

      var n2ExposureLabel = new Label( this );
      with( n2ExposureLabel )
      {
         margin = 4;
         wordWrapping = true;
         useRichText = true;
         maxWidth = GUI_LABEL_WIDTH;
         minWidth = GUI_LABEL_WIDTH;
         text = "Exposure (s):";
      }

      this.n2ExposureSpinBox = new SpinBox( this );
      this.n2ExposureSpinBox.minValue = 0;
      this.n2ExposureSpinBox.maxValue = 3600;
      this.n2ExposureSpinBox.setFixedWidth( 60 );
      this.n2ExposureSpinBox.toolTip = "<p></p>";
      this.n2ExposureSpinBox.onValueUpdated = function( value )
      {
         // TBD
      };

      hSizer = new HorizontalSizer;
      with( hSizer )
      {
         spacing = 4;
         add( n2ExposureLabel );
         add( this.n2ExposureSpinBox );
         add( new Label );
      }
      sizer.add( hSizer );
   }
   n2ParametersBar.setSection( n2ParametersSection );

   // --------------------------------------------------
   // --------------------------------------------------

   this.updateControls = function()
   {
      // update all controls taking data from engine parameters
      console.noteln( 'Updateing controls' );
   }

   // ------------------------------------------------------------------------
   // Dialog buttons
   // ------------------------------------------------------------------------

   var hsizer = new HorizontalSizer;
   hsizer.spacing = 6;

   var executeButton = new PushButton( this );
   executeButton.text = "Execute";
   executeButton.onClick = function()
   {
      parameters.exit = false;
      this.dialog.ok();
   };
   var cancelButton = new PushButton( this );
   cancelButton.text = "Close";
   cancelButton.onClick = function()
   {
      parameters.exit = true;
      this.dialog.ok();
   };
   hsizer.add( executeButton );
   hsizer.add( cancelButton );
   hsizer.addStretch();

   // window sizer
   this.sizer = new VerticalSizer;
   with( this.sizer )
   {
      margin = 6;
      spacing = 6;
      add( titlePane );
      add( globalParametersBar );
      add( globalParametersSection );
      add( hAlphaParametersBar );
      add( hAlphaParametersSection );
      add( hBetaParametersBar );
      add( hBetaParametersSection );
      add( o3ParametersBar );
      add( o3ParametersSection );
      add( s2ParametersBar );
      add( s2ParametersSection );
      add( n2ParametersBar );
      add( n2ParametersSection );
      add( hsizer );
      addStretch();
   }

   this.setScaledMinWidth( 500 );
   this.adjustToContents();
   this.setFixedSize();
}
SNROptimizerDialog.prototype = new Dialog;
