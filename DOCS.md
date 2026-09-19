commit-hash:88107736e53d2622a9241cabe38292d171c6f41f

<https://github.com/The-Land-of-Future/TLOF-Club/commits/main/MIDI/README.md>


# Midi

There are two different Midi Mapping styles (which can be used side-by-side):

* Mapping each button to one Midi channel, number and velocity
* Mapping each logical setting to one Midi channel, number and velocity



Those two approaches are different, because some toggles (the yellow ones in the Lighting Panel) toggle multiple logical settings (often depending on what's set in the Advanced section).
Therefore for each Midi Mapping it's notated, if it depends on what is selected in the Panel, or not.
Some, if not most, of the toggles, which depend on what is selected in the Advanced Section, are basically only shortcuts to change a specific selection of logical mappings, as specified by the Section Toggles in Channel 0, Number 0, Velocity 0 to 9 and Side Toggles in Channel 0, Number 0, Velocity 111 to 112.

Furthermore there are different types of Midi Events: [https://creators.vrchat.com/worlds/udon/midi/#midi-events](https://creators.vrchat.com/worlds/udon/midi/#midi-events).

In Midi Mappings, where `Type` states:

* Toggle(name) or Toggle: `MidiControlChange` messages toggle the state of the respective control, if applicable. `MidiNoteOn` set's the toggle to on, `MidiNoteOff` set's the toggle to off
* Enum(group): any Midi message with that channel, Number and Velocity will activate the respective control and deactivate the other controls in the same group.
* Button: any Midi message with that channel, Number and Velocity activates the respective control.
* Slider(name) or Slider: any Midi message to that Mapping will just set the Slider to be `(velocity/127)*100%` to the end (regardless of range). So if you send a velocity of 127, the slider will be maxed (`(127/127)*100% = 100%`).

Please note that some of the "Buttons" of the mappings below are basically only shortcuts to change a specific selection of logical mappings, as specified by the Section Toggles in Channel 0, Number 0, Velocity 0 to 9 and Side Toggles in Channel 0, Number 0, Velocity 111 to 112.

## Unmapped Buttons:

The only buttons in the panel that are (on purpose) not mapped are:
- Color Chord for Audio Link (The map doesn't use Color Chord afaik)
- DJ Spotlight Submit and Reset (you need to type in the name manually anyways)
- Activate DMX (so that it cannot be hit accidentally)
- Macro Page 1/Page2 (all the macro buttons are activatable. Those are only to compact the UI)
- Macro Reapply Color (The reason that toggle was needed is just fixed now)
- Import Macros (The Button only makes sense to press, if the text to import was changed beforehand, which has to be done manually)

# Mappings:

|Channel|Number|Velocity|Panel Section|Description|Based on What Selection|Type|
|-|-|-|-|-|-|-|
|0|0|0|Advanced|Section Floor|N/A (Panel/Local Only)|Toggle(SectionToggles)|
|0|0|1|Advanced|Section Dancer Podium|N/A (Panel/Local Only)|Toggle(SectionToggles)|
|0|0|2|Advanced|Section Screen Bottom|N/A (Panel/Local Only)|Toggle(SectionToggles)|
|0|0|3|Advanced|Section Screen Side|N/A (Panel/Local Only)|Toggle(SectionToggles)|
|0|0|4|Advanced|Section Screen Top|N/A (Panel/Local Only)|Toggle(SectionToggles)|
|0|0|5|Advanced|Section In Screen|N/A (Panel/Local Only)|Toggle(SectionToggles)|
|0|0|6|Advanced|Section Mirror Ball Inner|N/A (Panel/Local Only)|Toggle(SectionToggles)|
|0|0|7|Advanced|Section Mirror Ball Outer|N/A (Panel/Local Only)|Toggle(SectionToggles)|
|0|0|8|Advanced|Section Side Screen Top|N/A (Panel/Local Only)|Toggle(SectionToggles)|
|0|0|9|Advanced|Section Side Screen Bottom|N/A (Panel/Local Only)|Toggle(SectionToggles)|
|0|0|42|Macro|Apply|N/A (Panel/Local Only)|Button|
|0|0|43|Macro|Clear Apply|N/A (Panel/Local Only)|Button|
|0|0|44|Macro|Bypass Apply|N/A (Panel/Local Only)|Toggle(MacroBypassApply)|
|0|0|45|Macro|Apply Manually|N/A (Panel/Local Only)|Toggle(MacroApplyManually)|
|0|0|46|Macro|Set Macro Toggle|N/A (Panel/Local Only)|Toggle(MacroSet)|
|0|0|47|Macro|Macro 0|Set Macro Toggle|Button|
|0|0|48|Macro|Macro 1|Set Macro Toggle|Button|
|0|0|49|Macro|Macro 2|Set Macro Toggle|Button|
|0|0|50|Macro|Macro 3|Set Macro Toggle|Button|
|0|0|51|Macro|Macro 4|Set Macro Toggle|Button|
|0|0|52|Macro|Macro 5|Set Macro Toggle|Button|
|0|0|53|Macro|Macro 6|Set Macro Toggle|Button|
|0|0|54|Macro|Macro 7|Set Macro Toggle|Button|
|0|0|55|Macro|Macro 8|Set Macro Toggle|Button|
|0|0|56|Macro|Macro 9|Set Macro Toggle|Button|
|0|0|57|Macro|Macro 10|Set Macro Toggle|Button|
|0|0|58|Macro|Macro 11|Set Macro Toggle|Button|
|0|0|59|Macro|Macro 12|Set Macro Toggle|Button|
|0|0|60|Macro|Macro 13|Set Macro Toggle|Button|
|0|0|61|Macro|Macro 14|Set Macro Toggle|Button|
|0|0|62|Macro|Macro 15|Set Macro Toggle|Button|
|0|0|63|Macro|Macro 16|Set Macro Toggle|Button|
|0|0|64|Macro|Macro 17|Set Macro Toggle|Button|
|0|0|65|Macro|Macro 18|Set Macro Toggle|Button|
|0|0|66|Macro|Macro 19|Set Macro Toggle|Button|
|0|0|67|Macro|Macro 20|Set Macro Toggle|Button|
|0|0|68|Macro|Macro 21|Set Macro Toggle|Button|
|0|0|69|Macro|Macro 22|Set Macro Toggle|Button|
|0|0|70|Macro|Macro 23|Set Macro Toggle|Button|
|0|0|71|Macro|Macro 24|Set Macro Toggle|Button|
|0|0|72|Macro|Macro 25|Set Macro Toggle|Button|
|0|0|73|Macro|Macro 26|Set Macro Toggle|Button|
|0|0|74|Macro|Macro 27|Set Macro Toggle|Button|
|0|0|75|Macro|Macro 28|Set Macro Toggle|Button|
|0|0|76|Macro|Macro 29|Set Macro Toggle|Button|
|0|0|77|Macro|Macro 30|Set Macro Toggle|Button|
|0|0|78|Macro|Macro 31|Set Macro Toggle|Button|
|0|0|79|Effect|Confetti|N/A (Global Effect)|Button|
|0|0|80|Effect|Co2 Down|N/A (Global Effect)|Button|
|0|0|81|Effect|Co2 Up|N/A (Global Effect)|Button|
|0|0|82|Effect|Fire|N/A (Global Effect)|Button|
|0|0|83|Effect|Bubbles|N/A (Global Effect)|Button|
|0|0|84|Effect|Reset|N/A (Global Effect)|Button|
|0|0|111|Advanced|Side Left|N/A (Panel/Local Only)|Toggle(SideToggles)|
|0|0|112|Advanced|Side Right|N/A (Panel/Local Only)|Toggle(SideToggles)|
|0|1|0|Activation|Section Enabled|Advanced Section \& Side|Button[^2]|
|0|1|1|Activation|Spot Enabled|Advanced Section \& Side|Button[^2]|
|0|1|2|Activation|Wash Enabled|Advanced Section \& Side|Button[^2]|
|0|1|3|Effect|Laser Enabled|Advanced Section \& Side|Button[^2]|
|0|1|4|General|Color 0|Advanced Section \& Side; General Set Spot, Wash, Laser Color; General Set Value to Color|Button[^1]|
|0|1|5|General|Color 1|Advanced Section \& Side; General Set Spot, Wash, Laser Color; General Set Value to Color|Button[^1]|
|0|1|6|General|Color 2|Advanced Section \& Side; General Set Spot, Wash, Laser Color; General Set Value to Color|Button[^1]|
|0|1|7|General|Color 3|Advanced Section \& Side; General Set Spot, Wash, Laser Color; General Set Value to Color|Button[^1]|
|0|1|8|General|Color 4|Advanced Section \& Side; General Set Spot, Wash, Laser Color; General Set Value to Color|Button[^1]|
|0|1|9|General|Color 5|Advanced Section \& Side; General Set Spot, Wash, Laser Color; General Set Value to Color|Button[^1]|
|0|1|10|General|Color 6|Advanced Section \& Side; General Set Spot, Wash, Laser Color; General Set Value to Color|Button[^1]|
|0|1|11|General|Color 7|Advanced Section \& Side; General Set Spot, Wash, Laser Color; General Set Value to Color|Button[^1]|
|0|1|12|General|Color 8|Advanced Section \& Side; General Set Spot, Wash, Laser Color; General Set Value to Color|Button[^1]|
|0|1|13|General|Color 9|Advanced Section \& Side; General Set Spot, Wash, Laser Color; General Set Value to Color|Button[^1]|
|0|1|14|General|Color 10|Advanced Section \& Side; General Set Spot, Wash, Laser Color; General Set Value to Color|Button[^1]|
|0|1|15|General|Color 11|Advanced Section \& Side; General Set Spot, Wash, Laser Color; General Set Value to Color|Button[^1]|
|0|1|16|General|Color 12|Advanced Section \& Side; General Set Spot, Wash, Laser Color; General Set Value to Color|Button[^1]|
|0|1|17|General|Color 13|Advanced Section \& Side; General Set Spot, Wash, Laser Color; General Set Value to Color|Button[^1]|
|0|1|18|General|Color 14|Advanced Section \& Side; General Set Spot, Wash, Laser Color; General Set Value to Color|Button[^1]|
|0|1|19|General|Color 15|Advanced Section \& Side; General Set Spot, Wash, Laser Color; General Set Value to Color|Button[^1]|
|0|1|20|Midi Only|Write `[Neoluma][Midi] Pong` to Log, if Ready|N/A (Stateless)|Button|
|0|1|21|General|Set Value to Color (for Color Buttons)|N/A (Panel/Local Only)|Toggle(SetColor)|
|0|1|22|General|Set Spot Color|N/A (Panel/Local Only)|Toggle(SetColor)|
|0|1|23|General|Set Wash Color|N/A (Panel/Local Only)|Toggle(SetColor)|
|0|1|24|General|Set Laser Color|N/A (Panel/Local Only)|Toggle(SetColor)|
|0|1|25|Activation|Wash Band: Always on|Advanced Section \& Side|Button[^2]|
|0|1|26|Activation|Wash Band: Bass|Advanced Section \& Side|Button[^2]|
|0|1|27|Activation|Wash Band: Low Mid|Advanced Section \& Side|Button[^2]|
|0|1|28|Activation|Wash Band: Upper Mid|Advanced Section \& Side|Button[^2]|
|0|1|29|Activation|Wash Band: Treble|Advanced Section \& Side|Button[^2]|
|0|1|30|Activation|Spot Band: Always on|Advanced Section \& Side|Button[^2]|
|0|1|31|Activation|Spot Band: Bass|Advanced Section \& Side|Button[^2]|
|0|1|32|Activation|Spot Band: Low Mid|Advanced Section \& Side|Button[^2]|
|0|1|33|Activation|Spot Band: Upper Mid|Advanced Section \& Side|Button[^2]|
|0|1|34|Activation|Spot Band: Treble|Advanced Section \& Side|Button[^2]|
|0|1|35|Activation|Laser Band: Always on|Advanced Section \& Side|Button[^2]|
|0|1|36|Activation|Laser Band: Bass|Advanced Section \& Side|Button[^2]|
|0|1|37|Activation|Laser Band: Low Mid|Advanced Section \& Side|Button[^2]|
|0|1|38|Activation|Laser Band: Upper Mid|Advanced Section \& Side|Button[^2]|
|0|1|39|Activation|Laser Band: Treble|Advanced Section \& Side|Button[^2]|
|0|1|40|General|Gobo: 0|Advanced Section \& Side|Button[^2]|
|0|1|41|General|Gobo: 1|Advanced Section \& Side|Button[^2]|
|0|1|42|General|Gobo: 2|Advanced Section \& Side|Button[^2]|
|0|1|43|General|Gobo: 3|Advanced Section \& Side|Button[^2]|
|0|1|44|General|Gobo: 4|Advanced Section \& Side|Button[^2]|
|0|1|45|General|Gobo: 5|Advanced Section \& Side|Button[^2]|
|0|1|46|General|Gobo: 6|Advanced Section \& Side|Button[^2]|
|0|1|47|General|Gobo: 7|Advanced Section \& Side|Button[^2]|
|0|1|48|General|Gobo Spin Speed Reverse|Advanced Section \& Side|Button[^2]|
|0|1|49|Wall Line Activation|Wall Lines: Fix|N/A (Global)|Enum(WallLines)|
|0|1|50|Wall Line Activation|Wall Lines: Audio Link|N/A (Global)|Enum(WallLines)|
|0|1|51|Wall Line Activation|Wall Lines: Wave Forward|N/A (Global)|Enum(WallLines)|
|0|1|52|Wall Line Activation|Wall Lines: Wave Center|N/A (Global)|Enum(WallLines)|
|0|1|53|Wall Line Activation|Wall Lines: Wave Up|N/A (Global)|Enum(WallLines)|
|0|1|54|Wall Line Activation|Wall Lines: Wave Down|N/A (Global)|Enum(WallLines)|
|0|1|55|Wall Line Activation|Wall Lines: Flash|N/A (Global)|Enum(WallLines)|
|0|1|56|Wall Line Activation|Wall Lines: RESERVED|N/A (Global)|Enum(WallLines)|
|0|1|57|Advanced|Force Resync All|N/A (Global)|Button|
|0|1|58|Advanced|Allow Portals|N/A (Global)|Toggle(AllowPortals)|
|0|1|59|Advanced|Clean Light|N/A (Global)|Toggle(CleanLight)|
|0|1|60|Advanced|Very Poor Sign|N/A (Global)|Toggle(VeryPoorSign)|
|0|1|61|Advanced|RESERVED|N/A (Global)|Toggle|
|0|1|62|Activation|Disco Ball|N/A (Global)|Toggle(DiscoBall)|
|0|1|63|Activation|Mirror Ball Inner|N/A (Global)|Toggle(MirrorBallInner)|
|0|1|64|Activation|Mirror Ball Middle|N/A (Global)|Toggle(MirrorBallMiddle)|
|0|1|65|Activation|Mirror Ball Outer|N/A (Global)|Toggle(MirrorBallOuter)|
|0|1|66|Movement|Spot Movement: Static|N/A (Global)|Enum(SpotMovement)|
|0|1|67|Movement|Spot Movement: Wave Forward|N/A (Global)|Enum(SpotMovement)|
|0|1|68|Movement|Spot Movement: Wave Backward|N/A (Global)|Enum(SpotMovement)|
|0|1|69|Movement|Spot Movement: Circle Backward|N/A (Global)|Enum(SpotMovement)|
|0|1|70|Movement|Spot Movement: Circle Forward|N/A (Global)|Enum(SpotMovement)|
|0|1|71|Movement|Spot Movement: Random|N/A (Global)|Enum(SpotMovement)|
|0|1|72|Movement|Spot Movement: Strike|N/A (Global)|Enum(SpotMovement)|
|0|1|73|Movement|Spot Movement: RESERVED|N/A (Global)|Enum(SpotMovement)|
|0|1|74|Movement|Wash Movement: Static|N/A (Global)|Enum(WashMovement)|
|0|1|75|Movement|Wash Movement: Wash|N/A (Global)|Enum(WashMovement)|
|0|1|76|Movement|Wash Movement: Strike|N/A (Global)|Enum(WashMovement)|
|0|1|77|Movement|Wash Movement: RESERVED|N/A (Global)|Enum(WashMovement)|
|0|1|78|General|Random: Off|N/A (Global)|Enum(Random)|
|0|1|79|General|Random: Wave|N/A (Global)|Enum(Random)|
|0|1|80|General|Random: Random|N/A (Global)|Enum(Random)|
|0|1|81|General|Random: All|N/A (Global)|Enum(Random)|
|0|1|82|General|Blackout|N/A (Global)|Toggle(Blackout)|
|0|1|83|Effect|Flasher: Off|N/A (Global)|Enum(Flasher)|
|0|1|84|Effect|Flasher: Audio Link|N/A (Global)|Enum(Flasher)|
|0|1|85|Effect|Flasher: Random Audio Link|N/A (Global)|Enum(Flasher)|
|0|1|86|Effect|Flasher: Hard Audio Link|N/A (Global)|Enum(Flasher)|
|0|1|87|Effect|Flasher: Random|N/A (Global)|Enum(Flasher)|
|0|1|88|Effect|Flasher: Hard|N/A (Global)|Enum(Flasher)|
|0|1|89|Effect|Flasher: RESERVED|N/A (Global)|Enum(Flasher)|
|0|1|90|Effect|Flasher: RESERVED|N/A (Global)|Enum(Flasher)|
|0|1|91|Effect|Moving Head Strobe: Off|N/A (Global)|Enum(MovingHeadStrobe)|
|0|1|92|Effect|Moving Head Strobe: Random|N/A (Global)|Enum(MovingHeadStrobe)|
|0|1|93|Effect|Moving Head Strobe: Section Random|N/A (Global)|Enum(MovingHeadStrobe)|
|0|1|94|Effect|Moving Head Strobe: Hard|N/A (Global)|Enum(MovingHeadStrobe)|
|0|1|95|Advanced|Screen Mapping: Full|N/A (Global)|Enum(ScreenMapping)|
|0|1|96|Advanced|Screen Mapping: Cropped DMX|N/A (Global)|Enum(ScreenMapping)|
|0|1|97|Advanced|Screen Mapping: Mapped|N/A (Global)|Enum(ScreenMapping)|
|0|1|98|Advanced|Screen Mapping: RESERVED|N/A (Global)|Enum(ScreenMapping)|
|0|1|99|Wall Line Colors|Initialize|N/A (Global)|Enum(WallLineColors)|
|0|1|100|Wall Line Colors|Deepsea|N/A (Global)|Enum(WallLineColors)|
|0|1|101|Wall Line Colors|Skyhigh|N/A (Global)|Enum(WallLineColors)|
|0|1|102|Wall Line Colors|Lavender|N/A (Global)|Enum(WallLineColors)|
|0|1|103|Wall Line Colors|Lovepotion|N/A (Global)|Enum(WallLineColors)|
|0|1|104|Wall Line Colors|Yumekawa|N/A (Global)|Enum(WallLineColors)|
|0|1|105|Wall Line Colors|Sunset|N/A (Global)|Enum(WallLineColors)|
|0|1|106|Wall Line Colors|Goldenage|N/A (Global)|Enum(WallLineColors)|
|0|1|107|Wall Line Colors|Redlight|N/A (Global)|Enum(WallLineColors)|
|0|1|108|Wall Line Colors|Takefive|N/A (Global)|Enum(WallLineColors)|
|0|1|109|Wall Line Colors|Garden|N/A (Global)|Enum(WallLineColors)|
|0|1|110|Wall Line Colors|Energize|N/A (Global)|Enum(WallLineColors)|
|0|1|111|Wall Line Colors|Happy|N/A (Global)|Enum(WallLineColors)|
|0|1|112|Wall Line Colors|Poppinshower|N/A (Global)|Enum(WallLineColors)|
|0|1|113|Wall Line Colors|RGB|N/A (Global)|Enum(WallLineColors)|
|0|1|114|Wall Line Colors|Turquise|N/A (Global)|Enum(WallLineColors)|
|0|1|115|AudioLink|Reset Settings|N/A (Global)|Button|
|0|1|116|AudioLink Smoothing|Reset Settings|N/A (Global)|Button|
|0|1|117|General|UI Larger|N/A (Panel Only)|Button|
|0|1|118|General|UI Smaller|N/A (Panel Only)|Button|
|0|1|119|Midi Only|Log received and processed Midi events|N/A (Stateless)|Toggle(MidiLog)|
|0|1|120|Midi Only|Midi Feedback|N/A (Stateless)|Toggle(MidiFeedback)|
|0|1|121|Midi Only|Dump All State as Feedback|N/A (Stateless)|Button|
|0|2|ALL|General|Color R|N/A (Panel Only)|Slider(Color)|
|0|3|ALL|General|Color G|N/A (Panel Only)|Slider(Color)|
|0|4|ALL|General|Color B|N/A (Panel Only)|Slider(Color)|
|0|5|ALL|General|Spot Width|Advanced Section \& Side|Slider(SpotWidth)|
|0|6|ALL|General|Wash Width|Advanced Section \& Side|Slider(WashWidth)|
|0|7|ALL|General|Gobo Spin Speed|Advanced Section \& Side|Slider(GoboSpinSpeed)|
|0|8|ALL|Wall Line Activation|Wall Line Speed|N/A (Global Slider)|Slider(WallLineSpeed)|
|0|9|ALL|Wall Line Activation|Wall Line Tension|N/A (Global Slider)|Slider(WallLineTension)|
|0|10|ALL|Wall Line Activation|Wall Line Brightness|N/A (Global Slider)|Slider(WallLineBrightness)|
|0|11|ALL|Movement|Movement Speed|N/A (Global Slider)|Slider(MovementSpeed)|
|0|12|ALL|Effect|Flasher Speed|N/A (Global Slider)|Slider(FlasherSpeed)|
|0|13|ALL|Effect|Moving Head Strobe Speed|N/A (Global Slider)|Slider(MovingHeadStrobeSpeed)|
|0|14|ALL|Intensity|Global Intensity|N/A (Global Slider)|Slider(GlobalIntensity)|
|0|15|ALL|Intensity|Spot Intensity|N/A (Global Slider)|Slider(SpotIntensity)|
|0|16|ALL|Intensity|Wash Intensity|N/A (Global Slider)|Slider(WashIntensity)|
|0|17|ALL|Intensity|Blinder Intensity|N/A (Global Slider)|Slider(BlinderIntensity)|
|0|18|ALL|Intensity|Flasher Intensity|N/A (Global Slider)|Slider(FlasherIntensity)|
|0|19|ALL|Intensity|Laser Intensity|N/A (Global Slider)|Slider(LaserIntensity)|
|0|20|ALL|AudioLink|Threshold Bass|N/A (Global Slider)|Slider(AudioLink)|
|0|21|ALL|AudioLink|Threshold Low Mid|N/A (Global Slider)|Slider(AudioLink)|
|0|22|ALL|AudioLink|Threshold Upper Mid|N/A (Global Slider)|Slider(AudioLink)|
|0|23|ALL|AudioLink|Threshold Treble|N/A (Global Slider)|Slider(AudioLink)|
|0|24|ALL|AudioLink|X Divider Nothing <-> Bass|N/A (Global Slider)|Slider(AudioLink)|
|0|25|ALL|AudioLink|X Divider Bass <-> Low Mid|N/A (Global Slider)|Slider(AudioLink)|
|0|26|ALL|AudioLink|X Divider Low Mid <-> Upper Mid|N/A (Global Slider)|Slider(AudioLink)|
|0|27|ALL|AudioLink|X Divider Upper Mid <-> Treble|N/A (Global Slider)|Slider(AudioLink)|
|0|28|ALL|AudioLink|Gain|N/A (Global Slider)|Slider(AudioLink)|
|0|29|ALL|AudioLink|Treble|N/A (Global Slider)|Slider(AudioLink)|
|0|30|ALL|AudioLink|Bass|N/A (Global Slider)|Slider(AudioLink)|
|0|31|ALL|AudioLink|Hit Fade Length|N/A (Global Slider)|Slider(AudioLink)|
|0|32|ALL|AudioLink|Hit Fade Exp. Falloff|N/A (Global Slider)|Slider(AudioLink)|
|0|33|ALL|AudioLink Smoothing|Bass Smoothing|N/A (Global Slider)|Slider(AudioLink)|
|0|34|ALL|AudioLink Smoothing|Lower Mid Smoothing|N/A (Global Slider)|Slider(AudioLink)|
|0|35|ALL|AudioLink Smoothing|Upper Mid Smoothing|N/A (Global Slider)|Slider(AudioLink)|
|0|36|ALL|AudioLink Smoothing|Treble Smoothing|N/A (Global Slider)|Slider(AudioLink)|



# Logical Mappings

|Channel|Number|Velocity|Panel Section|Description|Type|
|-|-|-|-|-|-|
|0|37|0-31|Macro|Use Macro 0-31|Button|
|0|37|32-63|Macro|Set Macro 0-31|Button|
|0|56|64-79|General|Set Color 0-15|Button|

## For these next ones, each entry will be a range of 32.

All of the toggles will have the same description, but they will be for different sections \& sides.
Each Enum-group is tracked on it's own for each different Section \& Side.
Inside of the range of 0 to 31 these are the sections:

|Number|Section|Side|
|-|-|-|
|0|Floor|Left|
|1|Floor|Right|
|2|DancerPodium|Left|
|3|DancerPodium|Right|
|4|ScreenBottom|Left|
|5|ScreenBottom|Right|
|6|ScreenSide|Left|
|7|ScreenSide|Right|
|8|ScreenTop|Left|
|9|ScreenTop|Right|
|10|InScreen|Left|
|11|InScreen|Right|
|12|MirrorBallInner|Left|
|13|MirrorBallInner|Right|
|14|MirrorBallOuter|Left|
|15|MirrorBallOuter|Right|
|16|SideScreenTop|Left|
|17|SideScreenTop|Right|
|18|SideScreenBottom|Left|
|19|SideScreenBottom|Right|
|20|RESERVED|Left|
|21|RESERVED|Right|
|22|RESERVED|Left|
|23|RESERVED|Right|
|24|RESERVED|Left|
|25|RESERVED|Right|
|26|RESERVED|Left|
|27|RESERVED|Right|
|28|RESERVED|Left|
|29|RESERVED|Right|
|30|RESERVED|Left|
|31|RESERVED|Right|

|Channel|Number|Velocity|Panel Section|Description|Type|
|-|-|-|-|-|-|
|0|37|64-95|Activation|Section Enabled|Toggle(SectionEnabled)|
|0|37|96-127|Activation|Spot Enabled|Toggle(SpotEnabled)|
|0|38|0-31|Activation|Wash Enabled|Toggle(WashEnabled)|
|0|38|32-63|Effect|Laser Enabled|Toggle(LaserEnabled)|
|0|38|64-95|Activation|Wash Band: Always on|Enum(WashBand)|
|0|38|96-127|Activation|Wash Band: Bass|Enum(WashBand)|
|0|39|0-31|Activation|Wash Band: Low Mid|Enum(WashBand)|
|0|39|32-63|Activation|Wash Band: Upper Mid|Enum(WashBand)|
|0|39|64-95|Activation|Wash Band: Treble|Enum(WashBand)|
|0|39|96-127|Activation|Spot Band: Always on|Enum(SpotBand)|
|0|40|0-31|Activation|Spot Band: Bass|Enum(SpotBand)|
|0|40|32-63|Activation|Spot Band: Low Mid|Enum(SpotBand)|
|0|40|64-95|Activation|Spot Band: Upper Mid|Enum(SpotBand)|
|0|40|96-127|Activation|Spot Band: Treble|Enum(SpotBand)|
|0|41|0-31|Activation|Laser Band: Always on|Enum(LaserBand)|
|0|41|32-63|Activation|Laser Band: Bass|Enum(LaserBand)|
|0|41|64-95|Activation|Laser Band: Low Mid|Enum(LaserBand)|
|0|41|96-127|Activation|Laser Band: Upper Mid|Enum(LaserBand)|
|0|42|0-31|Activation|Laser Band: Treble|Enum(LaserBand)|
|0|42|32-63|General|Gobo: 0|Enum(Gobo)|
|0|42|64-95|General|Gobo: 1|Enum(Gobo)|
|0|42|96-127|General|Gobo: 2|Enum(Gobo)|
|0|43|0-31|General|Gobo: 3|Enum(Gobo)|
|0|43|32-63|General|Gobo: 4|Enum(Gobo)|
|0|43|64-95|General|Gobo: 5|Enum(Gobo)|
|0|43|96-127|General|Gobo: 6|Enum(Gobo)|
|0|44|0-31|General|Gobo: 7|Enum(Gobo)|
|0|44|32-63|General|Gobo Spin Speed Reverse|Toggle(GoboSpinSpeedReverse)|
|0|44|64-95|General|Set Spot to Color: 0|Enum(SpotColor)|
|0|44|96-127|General|Set Spot to Color: 1|Enum(SpotColor)|
|0|45|0-31|General|Set Spot to Color: 2|Enum(SpotColor)|
|0|45|32-63|General|Set Spot to Color: 3|Enum(SpotColor)|
|0|45|64-95|General|Set Spot to Color: 4|Enum(SpotColor)|
|0|45|96-127|General|Set Spot to Color: 5|Enum(SpotColor)|
|0|46|0-31|General|Set Spot to Color: 6|Enum(SpotColor)|
|0|46|32-63|General|Set Spot to Color: 7|Enum(SpotColor)|
|0|46|64-95|General|Set Spot to Color: 8|Enum(SpotColor)|
|0|46|96-127|General|Set Spot to Color: 9|Enum(SpotColor)|
|0|47|0-31|General|Set Spot to Color: 10|Enum(SpotColor)|
|0|47|32-63|General|Set Spot to Color: 11|Enum(SpotColor)|
|0|47|64-95|General|Set Spot to Color: 12|Enum(SpotColor)|
|0|47|96-127|General|Set Spot to Color: 13|Enum(SpotColor)|
|0|48|0-31|General|Set Spot to Color: 14|Enum(SpotColor)|
|0|48|32-63|General|Set Spot to Color: 15|Enum(SpotColor)|
|0|48|64-95|General|Set Wash to Color: 0|Enum(WashColor)|
|0|48|96-127|General|Set Wash to Color: 1|Enum(WashColor)|
|0|49|0-31|General|Set Wash to Color: 2|Enum(WashColor)|
|0|49|32-63|General|Set Wash to Color: 3|Enum(WashColor)|
|0|49|64-95|General|Set Wash to Color: 4|Enum(WashColor)|
|0|49|96-127|General|Set Wash to Color: 5|Enum(WashColor)|
|0|50|0-31|General|Set Wash to Color: 6|Enum(WashColor)|
|0|50|32-63|General|Set Wash to Color: 7|Enum(WashColor)|
|0|50|64-95|General|Set Wash to Color: 8|Enum(WashColor)|
|0|50|96-127|General|Set Wash to Color: 9|Enum(WashColor)|
|0|51|0-31|General|Set Wash to Color: 10|Enum(WashColor)|
|0|51|32-63|General|Set Wash to Color: 11|Enum(WashColor)|
|0|51|64-95|General|Set Wash to Color: 12|Enum(WashColor)|
|0|51|96-127|General|Set Wash to Color: 13|Enum(WashColor)|
|0|52|0-31|General|Set Wash to Color: 14|Enum(WashColor)|
|0|52|32-63|General|Set Wash to Color: 15|Enum(WashColor)|
|0|52|64-95|General|Set Laser to Color: 0|Enum(LaserColor)|
|0|52|96-127|General|Set Laser to Color: 1|Enum(LaserColor)|
|0|53|0-31|General|Set Laser to Color: 2|Enum(LaserColor)|
|0|53|32-63|General|Set Laser to Color: 3|Enum(LaserColor)|
|0|53|64-95|General|Set Laser to Color: 4|Enum(LaserColor)|
|0|53|96-127|General|Set Laser to Color: 5|Enum(LaserColor)|
|0|54|0-31|General|Set Laser to Color: 6|Enum(LaserColor)|
|0|54|32-63|General|Set Laser to Color: 7|Enum(LaserColor)|
|0|54|64-95|General|Set Laser to Color: 8|Enum(LaserColor)|
|0|54|96-127|General|Set Laser to Color: 9|Enum(LaserColor)|
|0|55|0-31|General|Set Laser to Color: 10|Enum(LaserColor)|
|0|55|32-63|General|Set Laser to Color: 11|Enum(LaserColor)|
|0|55|64-95|General|Set Laser to Color: 12|Enum(LaserColor)|
|0|55|96-127|General|Set Laser to Color: 13|Enum(LaserColor)|
|0|56|0-31|General|Set Laser to Color: 14|Enum(LaserColor)|
|0|56|32-63|General|Set Laser to Color: 15|Enum(LaserColor)|
|0|64-95|ALL|General|Spot Width|Slider(SpotWidth)|
|0|96-127|ALL|General|Wash Width|Slider(WashWidth)|
|1|0-31|ALL|General|Gobo Spin Speed|Slider(GoboSpinSpeed)|


# Midi Feedback

Once the AudioLink Midi controller is active it will send `[Neoluma][Midi] Ready` to the VRChat log.
If the Controller is Disabled (which can happen, if you lose permissions or the world is switched to DMX mode), it will send a message starting with `[Neoluma][Midi] Not Ready` to the VRChat log.


Each Mapping, which has a name associated in it's type can produce Feedback, if it's enabled via MIDI Mappings.

One Feedback line will start with `[Neoluma][Midi][Feedback] ` and will be followed by some Base64 encoded Data.
The data will start with one unsigned 32-bit integer for a version number.
For Version:
- 0: The Feedback May contain many repetitions of the following entry: `<unsigned 16-bit Name as it's Mapped-Number><signed 16-bit number (positive for section, negative to treat as extra data special to the Mapped-Number)><unsigned 32-bit integer>`

> `[Neoluma][Midi][Feedback]  AAAAAC0A//8BAAAA`
> For this hex data: `00 00 00 00   2d 00   ff ff   01 00 00 00`
> Meaning:
> - Version 0
> - Name 45, Section -1, Data: 1


Please note, that an attempt is being made to not log anything starting with or including `[Neoluma][Midi][Feedback] `, which doesn't follow this schema, but due to the many systems involved it may be possible for a malicious actor to theoretically log arbitrary pieces of data (e.g. via usernames, notifications, video player url's any many more), so NOTHING is bullet-proof!

Possibly the best way to ensure the proper placement is via regex verifying the entire line of the VRChat log.
A regex like this should probably extract the Base64 contents in it's first Capturing group: `^[0-9]{4}\.(?:0[1-9]|1[0-2])\.(?:[012][0-9]|3[01]) (?:[01][0-9]|2[0-4]):(?:[0-5][0-9]|60|61):(?:[0-5][0-9]|60|61) (?:Debug|Warning|Error)\s*-\s*\[Neoluma\]\[Midi\]\[Feedback\] ([-A-Za-z0-9+\/]*={0,3})`.
[View On Regex101.com](https://regex101.com/?regex=%5E%5B0-9%5D%7B4%7D%5C.%28%3F%3A0%5B1-9%5D%7C1%5B0-2%5D%29%5C.%28%3F%3A%5B012%5D%5B0-9%5D%7C3%5B01%5D%29+%28%3F%3A%5B01%5D%5B0-9%5D%7C2%5B0-4%5D%29%3A%28%3F%3A%5B0-5%5D%5B0-9%5D%7C60%7C61%29%3A%28%3F%3A%5B0-5%5D%5B0-9%5D%7C60%7C61%29+%28%3F%3ADebug%7CWarning%7CError%29%5Cs*-%5Cs*%5C%5BNeoluma%5C%5D%5C%5BMidi%5C%5D%5C%5BFeedback%5C%5D+%28%5B-A-Za-z0-9%2B%5C%2F%5D*%3D%7B0%2C3%7D%29&testString=2026.08.01+21%3A12%3A34+Error++++++-++HTTP%2F1.1+404+Not+Found%0A2026.08.01+21%3A12%3A34+Debug++++++-++%5BBehaviour%5D+Using+default+fx+mask+%28all+muscles+disabled%2C+all+transforms+enabled%29%0A2026.08.01+21%3A12%3A34+Warning++++-++Recovered+0+Network+IDs+from+Avatar%0A2026.08.01+21%3A12%3A34+Error++++++-++%5BNeoluma%5D%5BMidi%5D%5BFeedback%5D+what%0A2026.08.01+21%3A12%3A34+Debug++++++-++%5BBehaviour%5D+Using+default+fx+mask+%28all+muscles+disabled%2C+all+transforms+enabled%29%0A2026.08.01+21%3A12%3A34+Warning++++-++Recovered+0+Network+IDs+from+Avatar&flags=gm&flavor=pcre2&delimiter=%2F).

One could also alter the Regex to capture the Date, Time, Debug Level or to Match other logged pieces of Data to the Debug-Log.

<!-- Command to generate the table from this file: `grep "^|" MIDI\README.md | grep "([^)]*)|$" -o | cut -b 2- | grep "[^)|]*" -o | sort -u | nl -n ln -s"|" -w1` -->

Data types:
- Bool: 0 for Disabled, otherwise Enabled

Section Type:
- None: the section value has no meaning
- Logical: The section values 0-31 map to the section and side values as described in the Logical Mappings
- Section: The section values 0-9 map to the toggles in channel 0, number 0, velocity 0-9
- Side: The section values 0-1 map to the toggles in channel 0, number 0, velocity 111-112
- Color: The section value 0-3 map to the Sliders in channel 0, number 2-4
- SetColor: The section values 0-3 map to the toggles in channel 0, number 0, velocity 21-24
- AudioLink: The section value 0-16 map to the sliders in channel 0, number 20-36

Number|Name|Section Type|Type|Data
-|-|-|-|-
1|AllowPortals|None|Toggle|0-1
2|Blackout|None|Toggle|0-1
3|BlinderIntensity|None|Slider|0-127
4|CleanLight|None|Toggle|0-1
5|DiscoBall|None|Toggle|0-1
6|Flasher|None|Enum|0-7
7|FlasherIntensity|None|Slider|0-127
8|FlasherSpeed|None|Slider|0-127
9|GlobalIntensity|None|Slider|0-127
10|Gobo|Logical|Enum|0-7
11|GoboSpinSpeed|Logical|Slider|0-127
12|GoboSpinSpeedReverse|Logical|Toggle|0-1
13|LaserBand|Logical|Enum|0-4
14|LaserColor|Logical|Enum|0-15
15|LaserEnabled|Logical|Toggle|0-1
16|LaserIntensity|None|Slider|0-127
17|MirrorBallInner|None|Toggle|0-1
18|MirrorBallMiddle|None|Toggle|0-1
19|MirrorBallOuter|None|Toggle|0-1
20|MovementSpeed|None|Slider|0-127
21|MovingHeadStrobe|None|Enum|0-4
22|MovingHeadStrobeSpeed|None|Slider|0-127
23|Random|None|Enum|0-4
24|ScreenMapping|None|Enum|0-4
25|SectionEnabled|Logical|Toggle|0-1
26|SpotBand|Logical|Enum|0-4
27|SpotColor|Logical|Enum|0-15
28|SpotEnabled|Logical|Toggle|0-1
29|SpotIntensity|None|Slider|0-127
30|SpotMovement|None|Enum|0-7
31|SpotWidth|Logical|Slider|0-127
32|VeryPoorSign|None|Toggle|0-1
33|WallLineBrightness|None|Slider|0-127
34|WallLineColors|None|Enum|0-15
35|WallLineSpeed|None|Slider|0-127
36|WallLineTension|None|Slider|0-127
37|WallLines|None|Enum|0-7
38|WashBand|Logical|Enum|0-4
39|WashColor|Logical|Enum|0-15
40|WashEnabled|Logical|Toggle|0-1
41|WashIntensity|None|Slider|0-127
42|WashMovement|None|Enum|0-4
43|WashWidth|Logical|Slider|0-127
44|MidiFeedback|None|Toggle|0-1
45|MidiLog|None|Toggle|0-1
46|SectionToggles|Section|Toggle|0-1
47|SideToggles|Side|Toggle|0-1
48|MacroBypassApply|None|Toggle|0-1
49|MacroApplyManually|None|Toggle|0-1
50|MacroSet|None|Toggle|0-1
51|SetColor|SetColor|Toggle|0-1
52|Color|Color|Slider|0-127
53|AudioLink|AudioLink|Slider|0-127


[^1]: When the Set Color toggle is enabled, the Color Buttons all function as a Button (which set's the Color Button's Color).
Otherwise the Color Buttons function as multiple Enums: Enum(Spot Color), if Set Spot Color is on; Enum(Wash Color), if Set Wash Color is on and Enum(Laser Color), if Set Laser Color is on
[^2]: This Button set's the same setting across multiple logical toggles, which are specified by the state of the Section Toggles in Channel 0, Number 0, Velocity 0 to 9 and Side Toggles in Channel 0, Number 0, Velocity 111 to 112. Please note is is also possible to affect Nothing, if all Section or all Side Toggles are disabled.