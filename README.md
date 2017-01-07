# Truly responsive-menu plugin

This plugin is meant to help make menus on webpages truly responsive. Rather than break a menu to a mobile view on a CSS breakpoint, why not break it to a mobile view when the menu items start wrapping? That is exactly what this plugin will do for you.

## Install
Install using `npm i --save-dev truly-responsive-menu` or `bower i --save truly-responsive-menu`.

## Basic usage
Initiate the plugin using:

	trulyResponsiveMenu(options);

where `options` is an object containing options. For basic usage, add the `data-menu-container` attribute to the element containing all the menu items. The plugin will add the `toggleClasses` to the container (default: `'is-mobile'`) when the menu items start to wrap. When the screen is large enough to fit all the menu items on one line, the `toggleClasses` will be removed.

Basic implementation:

	<ul data-menu-container>
		<li>Menu item 1</li>
		<li>Menu item 2</li>
		<li>Menu item 3</li>
		<li>Menu item 4</li>
	</ul>

When the menu items start to wrap due to the viewport being too narrow, the `<ul>` will get the class `is-mobile`:

	<ul class="is-mobile" data-menu-container>
		<li>Menu item 1</li>
		<li>Menu item 2</li>
		<li>Menu item 3</li>
		<li>Menu item 4</li>
	</ul>

You can use this class to style the mobile version of the menu accordingly.

## Workings
The plugin relies on `offsetTop` to check whether all menu items have the same top position on the screen. If so, the menu items are not wrapping and the desktop view is sufficient. When the `offsetTop` values are not all equal, it means that at least one of the menu items is wrapping and the mobile menu must be initiated. After each resize event a function is fired (and debounced) that removes the `toggleClasses` and checks whether the menu items wrap. If so, the `toggleClasses` are readded to the `container`.

## Options
`container` (default: `'[data-menu-container]'`): A `string` representing the selector that is used to find the direct container of the menu items.

`children` (default: All the direct children of `container`): A `string` representing the selector that is used to find the menu items. When provided in the `options` object, the `children` selector should target all menu items that need to be accounted for when the plugin checks whether the menu wraps. For instance, if you add `'[data-menu-child]'` as a selector, you can use it as follows:

	<ul data-menu-container>
		<li data-menu-child>Menu item 1</li>
		<li data-menu-child>Menu item 2</li>
		<li data-menu-child>Menu item 3</li>
		<li data-menu-child>Menu item 4</li>
	</ul>

`toggleClasses` (default: `['is-mobile']`): An `array` of strings of all the classes that should be toggled on/off on the `container` element to trigger the mobile styles.

## Version
Version: 1.0.0 by Michael van den Oudenalder
