import { Routes } from '@angular/router';
import { PollsComponent } from './features/polls/polls.component';
import { HomeComponent } from './features/home/home.component';
import { CreatePollComponent } from './features/polls/create-poll/create-poll.component';
import { VotePollComponent } from './features/polls/vote-poll/vote-poll.component';
import { PollResultsComponent } from './features/polls/poll-results/poll-results.component';
import { ConsultPollComponent } from './features/polls/consult-poll/consult-poll.component';  // asegúrate que esté bien importado

export const routes: Routes = [
  {
    path: 'polls',
    loadComponent: () => import('./features/polls/polls.component').then(m => m.PollsComponent)
  },
  { path: 'home', component: HomeComponent },
  { path: 'create-poll', component: CreatePollComponent },
  { path: 'vote-poll', component: VotePollComponent },
  { path: 'vote-poll/:id', component: VotePollComponent },
  { path: 'poll-results', component: PollResultsComponent },
  { path: 'poll-results/:id', component: PollResultsComponent },
  {
    path: 'consult-poll',
    loadComponent: () => import('./features/polls/consult-poll/consult-poll.component').then(m => m.ConsultPollComponent)
  }
  , { path: '', redirectTo: 'home', pathMatch: 'full' },
];
