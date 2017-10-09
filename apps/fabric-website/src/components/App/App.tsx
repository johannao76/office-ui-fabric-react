import * as React from 'react';
import './App.scss';
import { AppState } from './AppState';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { Nav } from '../Nav/Nav';

export interface IAppProps extends React.Props<App> {
}

export interface IAppState {
  isNavOpen: boolean;
}

export class App extends React.Component<IAppProps, any> {

  constructor(props: IAppProps) {
    super(props);

    this.state = {
      isNavOpen: false
    };
  }

  public render() {
    let { isNavOpen } = this.state;

    let toggleIcon;
    if (isNavOpen) {
      toggleIcon = <i className='ms-Icon ms-Icon--ChromeClose' />;
    } else {
      toggleIcon = <i className='ms-Icon ms-Icon--GlobalNavButton' />;
    }

    return (
      <Fabric
        className={ css(
          'App',
          isNavOpen && 'is-navOpen'
        ) }
      >
        <div className='App-wrapper'>
          <div className='App-nav'>
            <Nav
              pages={ AppState.pages }
              onLinkClick={ this._onNavItemClicked.bind(this) }
            />
          </div>
          <div className='App-content' data-is-scrollable='true'>
            { this.props.children }
          </div>
        </div>
      </Fabric>
    );
  }

  private _onNavItemClicked(ev: MouseEvent) {
    this.setState({
      isNavOpen: false
    });
  }
}