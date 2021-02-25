import React from 'react';
import {Tournament} from "../../store/Tournaments/tournaments.model";
import {Typography} from "antd";

type TournamentsListProps = {
  tournaments: Tournament[]
};

export const TournamentsList: React.FC<TournamentsListProps> = ({tournaments}) => {
  if (!tournaments.length) {
    return <Typography>No Tournaments</Typography>
  }

  return <ul>
    {tournaments.map((tournament) => (
      <li key={tournament.id}>{tournament.name}</li>
    ))}
  </ul>;
};
