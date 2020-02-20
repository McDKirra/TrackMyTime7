import * as React from 'react';

import * as strings from 'TrackMyTime7WebPartStrings';

import { Link, ILinkProps } from 'office-ui-fabric-react';


export const baseDevDocs = 'https://developer.microsoft.com/en-us/fabric#/controls/web/';

/**
 *  Fabric UI Controls on DevDocs
 */

export const devDocsWeb = createLink( baseDevDocs,'_blank', 'Fabric UI' );
export const devDocsButton = createLink( baseDevDocs + 'button','_blank', 'Button' );
export const devDocsStack = createLink( baseDevDocs + 'stack','_blank', 'Stack' );
export const devDocsSlider = createLink( baseDevDocs + 'slider','_blank', 'Slider' );
export const devDocsToggle = createLink( baseDevDocs + 'toggle','_blank', 'Toggle' );
export const devDocsChoice = createLink( baseDevDocs + 'choicegroup','_blank', 'Choice' );
export const devDocsList = createLink( baseDevDocs + 'detailslist','_blank', 'List' );
export const devDocsDate = createLink( baseDevDocs + 'datepicker','_blank', 'DatePicker' );
export const devDocsPivo = createLink( baseDevDocs + 'pivot','_blank', 'Pivot' );


/**
 *  Github Repos
 */
export const baseGitContReact = 'https://github.com/SharePoint/sp-dev-fx-controls-react/';
export const gitRepoSPFxContReact = createLink( baseGitContReact,'_blank', 'controls-react' );


/**
 *  My repos
 */
export const baseMyRepos = 'https://github.com/mikezimm/';
export const gitRepoTrackMyTime = createRepoLinks( baseMyRepos + 'TrackMyTime7', '_blank', 'TrackMyTime7' );
export const gitRepoPivotTiles = createRepoLinks( baseMyRepos + 'Pivot-Tiles','_blank', 'Pivot-Tiles' );
export const gitRepoSocialiis = createRepoLinks( baseMyRepos + 'Social-iis-7','_blank', 'Social-iis-7' );



/**
 *  Github Samples
 */

export const baseGetSPFxContReactSrc = 'https://github.com/SharePoint/sp-dev-fx-controls-react/tree/master/src/controls/';
//let gitHubButton = createLink( baseDevDocs + 'stack','_blank', 'Stack' );
//let gitHubSlider = createLink( baseDevDocs + 'slider','_blank', 'Slider' );
//let gitHubToggle = createLink( baseDevDocs + 'toggle','_blank', 'Toggle' );
//let gitHubChoice = createLink( baseDevDocs + 'choicegroup','_blank', 'Choice' );
export const gitSampleReactList = createLink( baseGetSPFxContReactSrc + 'listView','_blank', 'List View' );
export const gitSampleReactDate = createLink( baseGetSPFxContReactSrc + 'dateTimePicker','_blank', 'Date-Time' );


/**
 *  Blogs
 */
export const blogSPTimeZone = createLink( 'https://sharepointmaven.com/sharepoint-time-zone/','_blank', 'Set your SharePoint Time-Zone' );

export function createRepoLinks(href: string, target: string, linkDesc: string){
    return {
        repo: createLink( href, target, linkDesc ),
        issues: createLink( href + '/Issues/', target, linkDesc + " Issues" ),
        wiki: createLink( href + '/Wiki/', target, linkDesc + " Wiki" ),
        href: href,
        target: target,
        desc: linkDesc,
    };
}

export function createLink(href: string, target: string, linkDesc: string){
    return (
        <Link href={href} target={ target }>{ linkDesc }</Link>
    );
}