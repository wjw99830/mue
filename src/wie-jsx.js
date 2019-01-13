export default function ({ types: t }) {
  return {
    visitor: {
      JSXElement: {
        exit(path) {
          const node = path.node;
          const opening = node.openingElement;
          const tagName = opening.name.name;
          const attributes = opening.attributes;
          if (tagName[0].toLowerCase() === tagName[0]) {
            const hData = t.objectExpression([]);
            const props = t.objectProperty(t.identifier('props'), t.objectExpression([]));
            const attrs = t.objectProperty(t.identifier('attrs'), t.objectExpression([]));
            const style = t.objectProperty(t.identifier('style'), t.objectExpression([]));
            const classMap = t.objectProperty(t.identifier('class'), t.objectExpression([]));
            const on = t.objectProperty(t.identifier('on'), t.objectExpression([]));
            attributes.forEach(attr => {
              const name = typeof attr.name === 'string' ? attr.name : attr.name.name;
              const value = attr.value;
              switch(name) {
                case 'className':
                if (t.isJSXExpressionContainer(value)) {
                  classMap.value = value.expression;
                } else if (t.isStringLiteral(value)) {
                  attrs.value.properties.push(t.objectProperty(t.identifier('class'), t.stringLiteral(value.value.trim())));
                }
                break;
                case 'style':
                if (t.isJSXExpressionContainer(value)) {
                  style.value = value.expression;
                } else if (t.isStringLiteral(value)) {
                  attrs.value.properties.push(t.objectProperty(t.identifier('style'), t.stringLiteral(value.value.trim())));
                }
                break;
                default:
                if (name.match(/^on/g)) {
                  t.assertJSXExpressionContainer(value);
                  on.value.properties.push(t.objectProperty(t.identifier(name.toLowerCase().replace('on', '')), value.expression));
                } else {
                  if (t.isJSXExpressionContainer(value)) {
                    props.value.properties.push(t.objectProperty(t.identifier(name), value.expression));
                  } else if (t.isStringLiteral(value)) {
                    attrs.value.properties.push(t.objectProperty(t.identifier(name), t.stringLiteral(value.value.trim())));
                  }
                }
                break;
              }
            });
            hData.properties = ([props, attrs, style, classMap, on]).filter(prop => {
              return prop.value.properties.length > 0
            });
            const hTag = t.stringLiteral(opening.name.name.trim());
            const hChildren = t.arrayExpression(node.children.map(child => {
              let ret = child;
              if (t.isJSXExpressionContainer(child)) {
                ret = child.expression;
              }
              return ret;
            }).filter(child => child.value !== ''));
            const hArgs = [hTag, hData];
            if (hChildren.elements.length > 0) {
              hArgs.push(hChildren);
            }
            const h = t.callExpression(t.memberExpression(t.identifier('Wie'), t.identifier('h')), hArgs);
            path.replaceWith(h);
          } else {
            const props = t.objectExpression([]);
            attributes.forEach(attr => {
              const name = typeof attr.name === 'string' ? attr.name : attr.name.name;
              const value = attr.value;
              const property = t.objectProperty(t.identifier(name), t.isStringLiteral(value) ? value : value.expression);
              props.properties.push(property);
            })
            const useArgs = [t.identifier(tagName)];
            if (props.properties.length > 0) {
              useArgs.push(props);
            }
            const use = t.callExpression(t.memberExpression(t.identifier('Wie'), t.identifier('use')), useArgs);
            path.replaceWith(use);
          }
        }
      },
      JSXText: {
        exit(path) {
          const node = path.node;
          path.replaceWith(t.stringLiteral(node.value.trim()));
        }
      }
    }
  }
}
