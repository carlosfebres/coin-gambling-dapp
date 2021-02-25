import React from 'react';
import {Card, Typography} from 'antd';
import {useRootSelector} from "../../store/utils";
import {TournamentsList} from "../../components/Tournaments/TournamentsList";
import {getAllTournaments} from "../../store/Tournaments/tournaments.selectors";
import {CreateTournamentForm} from "../../components/Tournaments/CreateTournamentForm";

export const HomePage = () => {
  // const dispatch = useDispatch();
  const tournaments = useRootSelector(getAllTournaments)

  return (
    <Card>
      <Typography>Game Started: </Typography>
      <CreateTournamentForm/>
      <TournamentsList tournaments={tournaments}/>
    </Card>
  );
};
