import React, { useState } from "react";
import { Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { createTournament } from "../../store/Tournaments/tournaments.slide";

export const CreateTournamentForm: React.FC = () => {
  const dispatch = useDispatch();
  const [tournamentName, setTournamentName] = useState("");

  const handleTournamentCreate = () => {
    dispatch(createTournament(tournamentName));
    setTournamentName("");
  };

  return (
    <Form>
      <Input
        onChange={(event) => setTournamentName(event.target.value)}
        value={tournamentName}
        placeholder="Tournament Name"
        type="text"
      />
      <Input onClick={handleTournamentCreate} type="submit" value="Create" />
    </Form>
  );
};
