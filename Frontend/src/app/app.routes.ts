// src/app/app.routes.ts
// import { Routes } from '@angular/router';
// import { LogInComponent } from './features/usuarios/log-in/log-in.component';

// export const routes: Routes = [
//   { path: 'log-in', component: LogInComponent },
//   { path: '', redirectTo: 'log-in', pathMatch: 'full' },
// ];


import { Routes } from '@angular/router';
import { PollsComponent } from './features/polls/polls.component'; 
import { HomeComponent } from './features/home/home.component';
import { CreatePollComponent } from './features/polls/create-poll/create-poll.component';
import { VotePollComponent } from './features/polls/vote-poll/vote-poll.component';
import { PollResultsComponent } from './features/polls/poll-results/poll-results.component';


export const routes: Routes = [
  { path: 'polls', component: PollsComponent },     
  { path: 'home', component: HomeComponent },
  { path: 'create-poll', component: CreatePollComponent  },
  { path: 'vote-poll', component: VotePollComponent },
  { path: 'poll-results', component: PollResultsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },  
];
