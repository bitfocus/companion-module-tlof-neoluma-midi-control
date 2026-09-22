# TLOF's VRChat NeoLuma MIDI protocol for controlling AudioLink lights - companion module

A module for Bitfocus Companion (for StreamDeck control) to use the TLOF's VRChat NeoLuma MIDI protocol for controlling their AudioLink lights.

World Link: https://vrchat.com/home/world/wrld_d3c63056-8295-432a-bb9d-a0f6319444b6/info  
World Wiki: https://github.com/The-Land-of-Future/TLOF-Club/wiki

## Requirements

It does require [loopMIDI](https://www.tobias-erichsen.de/software/loopmidi.html) with **feedback detection turned off** to be installed.
After installation make sure to restart your computer.

After that, in the loopMIDI settings, add a new port with the name `loopMIDIPort` (just remove the space from the name, unless you want troubles)

Then go to Steam, go to your library, go to VRChat, then Manage and then Properties.
Then there should be an input field for startup/launch options. Add `--midi=loopMIDIPort` into that text field!

Then (re)start VRChat.

## Actions

### Buttons

Buttons are one-push buttons, they just trigger buttons.

### Toggles

Toggles are toggle-state buttons. So press once to enable, press again to disable.

### Sliders

Sliders are sliders on a scale of 0 to 127. Stuff like speed, and color are on these.
I do not recommend setting slider values directly when using a rotatary action. It will lag companion.
Just add a button to set the value if you're doing something like that.

## Feedbacks

Toggles and sliders will have feedback.

## Usage

For specific usage documentation, checkout the docs https://github.com/The-Land-of-Future/TLOF-Club/blob/main/MIDI/README.md
