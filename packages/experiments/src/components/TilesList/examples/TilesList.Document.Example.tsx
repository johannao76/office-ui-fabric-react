
import * as React from 'react';
import {
  TilesList
} from '../../TilesList';
import { Tile } from '../../../Tile';
import { Selection, SelectionZone } from 'office-ui-fabric-react/lib/Selection';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { AnimationClassNames } from 'office-ui-fabric-react/lib/Styling';
import { IExampleGroup, IExampleItem, createGroup, createDocumentItems, getTileCells } from './ExampleHelpers';

function createGroups(): IExampleGroup[] {
  let offset = 0;

  const groups: IExampleGroup[] = [];

  for (let i = 0; i < 20; i++) {
    const items = createDocumentItems(50 + Math.ceil(Math.random() * 6) * 50, offset);

    offset += items.length;

    groups.push(createGroup(items, 'document', i));
  }

  return groups;
}

const GROUPS = createGroups();

const ITEMS = ([] as IExampleItem[]).concat(...GROUPS.map((group: { items: IExampleItem[]; }) => group.items));

declare class TilesListClass extends TilesList<IExampleItem> { }

const TilesListType: typeof TilesListClass = TilesList;

export class TilesListDocumentExample extends React.Component<{}, {}> {
  private _selection: Selection;

  constructor() {
    super();

    this._selection = new Selection({
      getKey: (item: IExampleItem) => item.key,
    });

    this._selection.setItems(ITEMS);
  }
  public render(): JSX.Element {
    const items = getTileCells(GROUPS, {
      onRenderCell: this._onRenderDocumentCell,
      onRenderHeader: this._onRenderHeader
    });

    return (
      // tslint:disable-next-line:jsx-ban-props
      <div style={ { padding: '4px' } }>
        <MarqueeSelection selection={ this._selection }>
          <SelectionZone
            selection={ this._selection }
            onItemInvoked={ this._onItemInvoked }
          >
            <TilesListType
              role='list'
              items={ items }
            />
          </SelectionZone>
        </MarqueeSelection>
      </div>
    );
  }

  @autobind
  private _onItemInvoked(item: IExampleItem, index: number, event: Event): void {
    event.stopPropagation();
    event.preventDefault();

    alert(`Invoked item '${item.name}'`);
  }

  @autobind
  private _onRenderDocumentCell(item: IExampleItem): JSX.Element {
    return (
      <Tile
        role='listitem'
        aria-setsize={ ITEMS.length }
        aria-posinset={ item.index }
        className={ AnimationClassNames.fadeIn400 }
        selection={ this._selection }
        selectionIndex={ item.index }
        foreground={
          <img
            src={
              `https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/docx_48x1.svg`
            }
            style={
              {
                display: 'block',
                width: '40px',
                height: '40px',
                margin: '11px'
              }
            }
          />
        }
        showForegroundFrame={ true }
        itemName={ item.name }
        itemActivity={ item.key }
      />
    );
  }

  @autobind
  private _onRenderHeader(item: IExampleItem): JSX.Element {
    return (
      <div role='presentation'>
        <h3>{ item.name }</h3>
      </div>
    );
  }
}
