# Lala.ListStyle
Neos Package that adds the option to change the list-style of uls and ols.

## Warning
This package is WIP.

Please keep the following caveats in mind:
* This plugin does not support adding classes to the lists. Instead, it will add an attribute `list-style-type="circle"` to the list
* When changing the style of a list, the complete list has to be selected in the editor, otherwise the list will be split up into multiple lists with different styles
* It is not possible to allow only a subset of the configured styles per property

## Installation
`composer require lala/list-style:dev-master`

## Usage

1. Enable formatting for a property:
```yaml
'Neos.Demo:Content.Text':
  superTypes:
    'Neos.Neos:Content': true
    'Neos.NodeTypes.BaseMixins:TextMixin': true

  properties:
    text:
      ui:
        inline:
          editorOptions:
            formatting:
              # Enable unordered lists
              ul: true
              # Enabled ordered lists
              ol: true
              # Enable custom list styles
              listStyle: true
```
2. Create a list in the editor
3. Select the whole using the cursor
4. Open the dropdown and change the list style

## Styling
Please note that this plugin does not supply list styles on it's own.

There is a `ListStyles.css` file in `Resources/Public` that you can include if needed:

```
prototype(Neos.Neos:Page) {
    head.stylesheets {
        listStyles = Neos.Fusion:Component {
            href = Neos.Fusion:ResourceUri {
                path = 'resource://Lala.ListStyle/Public/ListStyles.css'
            }

            renderer = afx`
                <link rel="stylesheet" href={props.href} media="all" />
            `
        }
    }
}
```

## Customization
The available list styles can be customized through the Settings:

```yaml
Lala:
  ListStyle:
    styles:
      ul:
        default:
          value: ''
          title: 'Default'
        circle:
          value: 'neos-list-circle'
          title: 'Circle'
        square:
          value: 'neos-list-square'
          title: 'Square'

        # To disable styles, set them to NULL
        # square: ~
      ol:
        default:
          value: ''
          title: 'Default'
        upper-roman:
          value: 'neos-list-upper-roman'
          title: 'Upper Roman'
        lower-alpha:
          value: 'neos-list-lower-alpha'
          title: 'Lower Alpha'
```

The `title` is used as the button label in the backend, the `value` will be the value of the `list-style-type` attribute of the list.
Make sure to add styling for your custom list styles.
