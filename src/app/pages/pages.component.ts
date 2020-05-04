import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {
  currentUser = JSON.parse(localStorage.getItem('currentUser'));
  getRoleMenu() {
    for(let i = 0; i < MENU_ITEMS.length; i++)
    {
      if(!(this.currentUser.isRoleManagement || this.currentUser.isRoleAdmin || this.currentUser.isRoleAgentMkt || this.currentUser.isRoleTeamLeader) && MENU_ITEMS[i].data == 1)
      {
        MENU_ITEMS[i].hidden = true;
      }
      else
      {
        if(MENU_ITEMS[i].children != null)
        {
          for(let j = 0; j < MENU_ITEMS[i].children.length; j++)
          {
            if((!(this.currentUser.isRoleManagement || this.currentUser.isRoleAdmin) && this.currentUser.org.id != '4') 
                  && (MENU_ITEMS[i].children[j].data == 'lead' || MENU_ITEMS[i].children[j].data == 'delivery' || MENU_ITEMS[i].children[j].data == 'performance'))
            {
              MENU_ITEMS[i].children[j].hidden = true;
            }
            else if(!(this.currentUser.isRoleManagement || this.currentUser.isRoleAdmin) && (MENU_ITEMS[i].children[j].data == 'marketing' || MENU_ITEMS[i].children[j].data == 'Campaign'))
            {
              MENU_ITEMS[i].children[j].hidden = true;
            }
            else if((this.currentUser.isRoleManagement || this.currentUser.isRoleAdmin) && MENU_ITEMS[i].children[j].data == 'Campaign')
            {
              for(let c = 0; c < MENU_ITEMS[i].children[j].children.length; c++)
              {
                if(this.currentUser.org.id != '4' &&  (MENU_ITEMS[i].children[j].children[c].data == 'create' || MENU_ITEMS[i].children[j].children[c].data == 'update'))
                {
                  MENU_ITEMS[i].children[j].children[c].hidden = true;
                }
              }
            }
          }
        }       
      }
      if(this.currentUser.org.id != '4' &&  MENU_ITEMS[i].data == 'rescuejob')
      {
        MENU_ITEMS[i].hidden = true;
      }
      else
      {
        if(MENU_ITEMS[i].children != null)
        {
          for(let v = 0; v < MENU_ITEMS[i].children.length; v++)
          {
            if(!(this.currentUser.isRoleManagement || this.currentUser.isRoleAdmin) && (MENU_ITEMS[i].children[v].data == 'validator' || MENU_ITEMS[i].children[v].data == 'salepending' || MENU_ITEMS[i].children[v].data == 'logistic')){
              MENU_ITEMS[i].children[v].hidden = true;
            }
            else if(!this.currentUser.isRoleCsAgent && MENU_ITEMS[i].children[v].data == 'myrescue')
            {
              MENU_ITEMS[i].children[v].hidden = true;
            }
          }
        }        
      }
    }
    return MENU_ITEMS;
  }
  menu = this.getRoleMenu();
}
