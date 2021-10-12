import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'testgraph',
    loadChildren: () => import('./testgraph/testgraph.module').then( m => m.TestgraphPageModule)
  },
  {
    path: 'finnhub',
    loadChildren: () => import('./finnhub/finnhub.module').then( m => m.FinnhubPageModule)
  },
  {
    path: 'polygon',
    loadChildren: () => import('./polygon/polygon.module').then( m => m.PolygonPageModule)
  },
  {
    path: 'updatechart',
    loadChildren: () => import('./updatechart/updatechart.module').then( m => m.UpdatechartPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
