import { Routes } from "@angular/router";

import { GroupComponent } from "./group/group.component";

export const GroupRoutes: Routes = [
  {
    path: "",
    component: GroupComponent,
    data: { title: "Group", breadcrumb: "Group" }
  },
];
