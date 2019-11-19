// ****************************************************************************
// PixInsight JavaScript Runtime API - PJSR Version 1.0
// ****************************************************************************
// NearTrueColorNarrowbandComposition.js
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
#define TITLE "Near True Color Narrowband Composition"
#define VERSION "1.0"

#feature-id Utilities > NearTrueColorNarrowbandComposition

#feature-info Near True Color Narrowband Composition. < br / > \
    <br />\
   This script digests narrowband images taken with different astronomical filters \
      and creates an near-true colorized RGB image by properly composing and caling each filtered image contribution. < br / > \
      Based on <i>CEDIC 2019: Creating near true color images for nebulae from narrow band data using PixInsight</i> \
      workshop by Edoardo Luca Radice.<br>\
    Copyright & copy; 2019 Edoardo Luca Radice, Roberto Sartori. All Rights Reserved.

#include <pjsr/ColorSpace.jsh>
#include <pjsr/DataType.jsh>
#include <pjsr/FrameStyle.jsh>
#include <pjsr/NumericControl.jsh>
#include <pjsr/SampleType.jsh>
#include <pjsr/Sizer.jsh>
#include <pjsr/UndoFlag.jsh>
#include <pjsr/SectionBar.jsh>
#include "NearTrueColorNarrowbandComposition-Engine.js"
#include "NearTrueColorNarrowbandComposition-GUI.js"
/* beautify ignore:end */

function main()
{
   console.hide();

   if ( Parameters.isGlobalTarget )
   {
      // Script has been launched in global context, execute and exit
      var engine = new SNROptimizerEngine();
      engine.loadParameters();
      engine.execute();
      return;
   }

   // Prepare the dialog
   var dialog = new SNROptimizerDialog();
   dialog.parameters.exit = false;

   // Runloop
   while ( !dialog.parameters.exit )
   {

      if ( dialog.isViewTarget && !Parameters.targetView )
      {
         // A target is already defined, init it as the target view
         dialog.parameters.targetView = this.targetView;
         dialog.parameters.getParameters();
      }
      else
      {
         // Dialog needs to be opened in order to select the image and set parameters
         // Use the current active view as target by default
         dialog.parameters.targetView = ImageWindow.activeWindow.currentView;
      }

      // Run the dialog
      if ( !dialog.execute() )
      {
         // Dialog closure forced
         return;
      }

      // do the job
      if ( !dialog.parameters.exit )
      {
         console.show();
         dialog.engine.execute();
         console.hide();
      }
   }
}

main();

// ****************************************************************************
// EOF CorrectMagentaStars.js
