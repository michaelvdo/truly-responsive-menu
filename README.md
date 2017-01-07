# Truly responsive-menu plugin

This plugin is meant to help make menus on webpages truly responsive. Rather than break a menu to a mobile view on a CSS breakpoint, why not break it to a mobile view when the menu items start wrapping? That is exactly what this plugin will do for you.

## Install
Install using `npm i --save-dev truly-responsive-menu`.

## Usage
Initiate the plugin using:

	trulyResponsiveMenu(options);

where the options object can contain the following:

`container`: A `string` representing the selector that is used to find the direct container of the menu items. Default: `[data-menu-container]`.

`children`: A `string` representing the selector that is used to find the menu items. Default: All the direct children of the `container`.

`toggleClasses`: An `array` of strings of all the classes that should be toggled on/off on the `container` element to trigger the mobile styles. Default: `is-mobile`.

## Version
Version: 1.0.0 by Michael van den Oudenalder
