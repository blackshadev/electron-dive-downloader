# Electron dive downloader

## Installation

- Ensure you have all the dependancies form libdivecomputer and libdivecomputerjs (see [here](https://github.com/blackshadev/libdivecomputerjs) for more info):
  - libusb-1.0-0 
  - libhidapi (can be build into libusb) 
  - BlueZ (part of libbluetooth3) 
  - build-essentials 
  - autoconf 
  - pkg-config 
  - cmake

For ubuntu run
`sudo apt install libusb-1.0-0 libhidapi-libusb0 libbluetooth3 build-essentials autoconf pkg-config cmake`


## Common problems

### Linux: The library compiles and tests work, but for my USB based device the `new Device` fails.

For linux you need to define how and who can access newly plugged in devices. You can put [this](https://github.com/libdivecomputer/libdivecomputer/blob/master/contrib/udev/libdivecomputer.rules) file in /etc/udev/rules.d/ . Ensure your user is part of the `plugdev` group (and ensure it exists). After a re-login to ensure your user groups are reloaded, and after you re plugin the device. it should work fine.

### Linux: It keeps throwing UNSUPPORTED errors for USB or bluetooth.

Chances are libdivecomputer compiled without the required libraries. Ensure you can run the following commando's

- `pkg-config --exists --print-errors libusb-1.0 && echo 'LIBUSB found'`
- `pkg-config --exists --print-errors bluez && echo 'BlueZ found'`

if both echo that they found the lib, great, if not, ensure you have `libusb-1.0-0` and `libbluetooth3` installed, allong with all the build tools like `build-essentials autoconf pkg-config cmake`. if it found them. conpile again `yarn clean` and `yarn build`