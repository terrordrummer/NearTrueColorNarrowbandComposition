// ****************************************************************************
// PixInsight JavaScript Runtime API - PJSR Version 1.0
// ****************************************************************************
// NearTrueColorNarrowbandComposition-EnginePrototypes.js
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

/* beautify ignore:end */

SNROptimizerEngine.prototype.cameraSensors = function()
{
   var sensors = [
   {
      name: "SONY IMX294 4/3″ CMOS",
      efficiency:
      {
         Halpha: 1,
         Hbeta: 1,
         O3: 1,
         S2: 1,
         N2: 1
      }
   },
   {
      name: "SONY IMX071 CMOS",
      efficiency:
      {
         Halpha: 1,
         Hbeta: 1,
         O3: 1,
         S2: 1,
         N2: 1
      }
   },
   {
      name: "SONY IMX183CLK-J/CQJ-J 1″ CMOS",
      efficiency:
      {
         Halpha: 1,
         Hbeta: 1,
         O3: 1,
         S2: 1,
         N2: 1
      }
   },
   {
      name: "SONY IMX533 1″ CMOS",
      efficiency:
      {
         Halpha: 1,
         Hbeta: 1,
         O3: 1,
         S2: 1,
         N2: 1
      }
   }, ];

   return sensors;
}

SNROptimizerEngine.prototype.defaultSensorParameters = function()
{
   return {
      Halpha: 1,
      Hbeta: 1,
      O3: 1,
      S2: 1,
      N2: 1
   }
}

SNROptimizerEngine.prototype.cameraSensorNames = function()
{
   return this.cameraSensors().map( item => item.name );
}

SNROptimizerEngine.prototype.cameraSensorEfficiencyFromIndex = function( index )
{
   let methods = this.rejectionMethods();
   return methods[ index ].efficiency;
}
