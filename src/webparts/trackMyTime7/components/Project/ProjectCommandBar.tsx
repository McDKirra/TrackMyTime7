import * as React from 'react';

import * as strings from 'TrackMyTime7WebPartStrings';

//import * as links from './AllLinks';

import { ITrackMyTime7Props } from '../ITrackMyTime7Props';
import { ITrackMyTime7State, IProjectOptions } from '../ITrackMyTime7State';

import { Fabric, initializeIcons } from 'office-ui-fabric-react';
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';
import {CommandBarButton, IButtonProps,} from "office-ui-fabric-react/lib/Button";

// Initialize icons in case this example uses them
initializeIcons();

import styles from './CommandBar.module.scss';

export interface ICommandBarProps {
    /**
   * Callback for when the selected pivot item is changed.
   */
  newProject?: (item?: any, ev?: React.MouseEvent<HTMLElement>) => void;
  editProject?: (item?: any, ev?: React.MouseEvent<HTMLElement>) => void;
  copyProject?: (item?: any, ev?: React.MouseEvent<HTMLElement>) => void;
  parkProject?: (item?: any, ev?: React.MouseEvent<HTMLElement>) => void;  
  rejectProject?: (item?: any, ev?: React.MouseEvent<HTMLElement>) => void;
  closeProject?: (item?: any, ev?: React.MouseEvent<HTMLElement>) => void;

  commandClass?: string;
  setLayout?: string;

}

export interface ICommandBarState {
    hovering?: any;
    visible?: any;
}
  
export default class MyCommandBar extends React.Component<ICommandBarProps, ICommandBarState> {

    constructor(props: ICommandBarProps, state: ICommandBarState) {
        super(props);
    
        this.state = {
          hovering: 10,
          visible:10
        };
    }

    public render(): JSX.Element {
        
        //2020-05-19:  Copied from Socialiis7/Master CommandBar.tsx
        const customButton = (props: IButtonProps) => {

            return (
              <CommandBarButton
                {...props}
                styles={{
                  ...props.styles,
                  root: {backgroundColor: 'white'  ,padding:'10px 20px 10px 10px !important', height: 32, borderColor: 'white'},
                  textContainer: { fontSize: 16, color: '#00457E' },
                  icon: { 
                    fontSize: 18,
                    fontWeight: "bolder",
                    margin: '0px 2px',
                 },
                }}
              />
            );
          };

        //2020-05-19:  Format copied from Socialiis7/Master CommandBar.tsx
        const _new : ICommandBarItemProps = { key: 'new', text: 'New',  name: '',   ariaLabel: 'New', commandBarButtonAs: customButton,
            iconProps: {  iconName: 'Add', },
            onClick: () => this.props.newProject(),
        };

        const _edit : ICommandBarItemProps = { key: 'edit', text: 'Edit',  name: '',   ariaLabel: 'Edit', commandBarButtonAs: customButton,
            iconProps: {  iconName: 'Edit', },
            onClick: () => this.props.editProject(),
        };

        const _copy : ICommandBarItemProps = { key: 'copy', text: 'Copy',  name: '',   ariaLabel: 'Copy', commandBarButtonAs: customButton,
            iconProps: {  iconName: 'Copy', },
            onClick: () => this.props.copyProject(),
        };

        const _park : ICommandBarItemProps = { key: 'park', text: 'Park',  name: '',   ariaLabel: 'Park', commandBarButtonAs: customButton,
            iconProps: {  iconName: 'Park', },
            onClick: () => this.props.parkProject(),
        };

        const _reject : ICommandBarItemProps = { key: 'reject', text: 'Reject',  name: '',   ariaLabel: 'Reject', commandBarButtonAs: customButton,
            iconProps: {  iconName: 'Reject', },
            onClick: () => this.props.rejectProject(),
        };

        const _close : ICommandBarItemProps = { key: 'close', text: 'Close',  name: '',   ariaLabel: 'Close', commandBarButtonAs: customButton,
            iconProps: {  iconName: 'Close', },
            onClick: () => this.props.closeProject(),
        };

        //2020-05-19:  Format copied from Socialiis7/Master CommandBar.tsx
        const _items: ICommandBarItemProps[] = [ _new, _edit, _copy ];

        //2020-05-19:  Format copied from Socialiis7/Master CommandBar.tsx
        const _overFlowItems: ICommandBarItemProps[] = [  _park, _reject, _close   ];

        // <div className={ styles.container }></div>
        return (
        <div>
            <CommandBar 
            items={ _items }
            overflowItems={_overFlowItems}
            farItems={ [] }
            styles={{
                root: { background: 'white', paddingLeft: '0px', height: '32px' }, // - removed backgroundColor: 'white'  
                primarySet: { height: '32px' }, //This sets the main _items - removed backgroundColor: 'white'  
                secondarySet:  { height: '32px' }, //This sets the _farRightItems

            }}
            overflowButtonAs = {customButton}
            />
        </div>
        );

    }
}    
