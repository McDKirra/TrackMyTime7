import { Web } from "@pnp/sp/presets/all";

import { sp, Views, IViews } from "@pnp/sp/presets/all";

import { IListInfo, IMyListInfo, IServiceLog } from '../../../../services/listServices/listTypes'; //Import view arrays for Time list

import { changes, IMyFieldTypes } from '../../../../services/listServices/columnTypes'; //Import view arrays for Time list

import { IMyView,  } from '../../../../services/listServices/viewTypes'; //Import view arrays for Time list

import { addTheseItemsToList } from '../../../../services/listServices/listServices';

import { IFieldLog, addTheseFields } from '../../../../services/listServices/columnServices'; //Import view arrays for Time list

import { IViewLog, addTheseViews } from '../../../../services/listServices/viewServices'; //Import view arrays for Time list

import { TMTProjectFields, TMTTimeFields} from './columnsTMT'; //Import column arrays (one file because both lists use many of same columns)

import { projectViews} from './viewsTMTProject';  //Import view arrays for Project list

import { timeViews } from './viewsTMTTime'; //Import view arrays for Time list

import { TMTDefaultProjectItems, TMTTestTimeItems, IAnyArray } from './ItemsTMT'; // Import items to create in the list

export async function provisionTheList( listName : 'Projects' | 'TrackMyTime', webURL: string ): Promise<IServiceLog[]>{

    let statusLog : IServiceLog[] = [];
    let createTheseFields : IMyFieldTypes[] = [];
    let createTheseViews : IMyView[] = [];
    let createTheseItems : IAnyArray = [];

    let alertMe = false;
    let consoleLog = false;

    let theList = {
        title: listName,
        desc: 'Update List Desc in VSCode',
        template: 100,
        enableContentTypes: true,
        additionalSettings: { EnableVersioning: true, MajorVersionLimit: 50, },
      };

    if (listName === 'Projects') {
        createTheseFields = TMTProjectFields();
        createTheseViews = projectViews;
        createTheseItems = TMTDefaultProjectItems;

    } else if (listName === 'TrackMyTime') {
        createTheseFields = TMTTimeFields();
        createTheseViews = timeViews;

        let currentUser = await sp.web.currentUser.get();
        createTheseItems = TMTTestTimeItems(currentUser);
        

    }

    const thisWeb = Web(webURL);
    const ensuredList = await thisWeb.lists.ensure(theList.title);
    const listFields = ensuredList.list.fields;
    const listViews = ensuredList.list.views;

    let fieldsToGet = createTheseFields.map ( thisField => {
        return thisField.name;
    });

    let fieldFilter = "StaticName eq '" + fieldsToGet.join("' or StaticName eq '") + "'";

    console.log('fieldFilter:', fieldFilter);

    const  currentFields = await listFields.select('StaticName,Title,Hidden,Formula,DefaultValue,Required,TypeAsString,Indexed,OutputType,DateFormat').filter(fieldFilter).get();

    const  currentViews = await listViews.get();

    console.log(theList.title + ' list fields and views', currentFields, currentViews);

    alert('Still need to check changesFinal - hidding original fields and setting and why Hours calculated is single line of text');

    let result = await addTheseFields(['create','changesFinal'], theList, ensuredList, currentFields, createTheseFields, alertMe, consoleLog );

    //let testViews = projectViews;
    //alert('adding Views');
    let result2 = await addTheseViews(['create'],  theList, ensuredList, currentViews, createTheseViews, alertMe, consoleLog);

    let result3 = await addTheseItemsToList(theList, thisWeb, createTheseItems, true, true);

//    let result = addTheseFields(['setForm'],webURL, theList, testFields);

    return statusLog;

}
