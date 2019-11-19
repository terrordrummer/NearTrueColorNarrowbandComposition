// ****************************************************************************
// PixInsight JavaScript Runtime API - PJSR Version 1.0
// ****************************************************************************
// NearTrueColorNarrowbandComposition-Engine.js
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
#include "NearTrueColorNarrowbandComposition-EnginePrototypes.js"
/* beautify ignore:end */

function EngineParametersPrototype()
{
   // -------------------------------------
   // Engine parameters
   // -------------------------------------
   this.inputFiles = [];
   this.backgroundROI = {
      x: 0,
      y: 0,
      w: 0,
      h: 0
   };
   this.signalROI = {
      x: 0,
      y: 0,
      w: 0,
      h: 0
   };

   this.reset = function()
   {
      this.backgroundPreviews = [];
      this.signalPreviews = [];
   }

   this.sensorEfficiency = SNROptimizerEngine.prototype.defaultSensorParameters();

}

// The script's process prototype.
function SNROptimizerEngine()
{
   this.parameters = new EngineParametersPrototype();

   this.setCameraSensorFromIndex = function( index )
   {
      this.parameters.sensorEfficiency = this.cameraSensorEfficiencyFromIndex( index );
   }

   // -------------------------------------
   // Image reference helpers
   // -------------------------------------
   this.referenceImageList = function()
   {
      return [
         "Hydrogen-alpha (H-α)",
         "Hydrogen-beta (H-β)",
         "Oxygen (OIII)",
         "Sulphur (SII)",
         "Nitrogen (NII)"
      ];
   }

   // -------------------------------------
   // Initialize PixelMath instance
   // -------------------------------------
   this.initializeCalculusTools = function()
   {
      var PM = new PixelMath;
      PM.expression1 = "";
      PM.expression2 = "";
      PM.expression3 = "";
      PM.useSingleExpression = true;
      PM.symbols = "";
      PM.generateOutput = true;
      PM.singleThreaded = false;
      PM.use64BitWorkingImage = false;
      PM.rescale = false;
      PM.rescaleLower = 0;
      PM.rescaleUpper = 1;
      PM.truncate = true;
      PM.truncateLower = 0;
      PM.truncateUpper = 1;
      PM.createNewImage = true;
      PM.showNewImage = false;
      PM.newImageWidth = 0;
      PM.newImageHeight = 0;
      PM.newImageAlpha = false;
      PM.newImageColorSpace = PixelMath.prototype.SameAsTarget;
      PM.newImageSampleFormat = PixelMath.prototype.SameAsTarget;
      this.PM = PM;
   }

   this.doMath = function( expression, target, newImageId )
   {
      this.PM.expression = expression;
      this.PM.newImageId = newImageId;
      this.PM.executeOn( target, false );
   }

   // -------------------------------------
   // Execute and management function
   // -------------------------------------


   this.execute = function() {

   }
}
