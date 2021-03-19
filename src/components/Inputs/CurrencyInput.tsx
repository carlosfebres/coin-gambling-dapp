import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import { MenuItem, Select } from "@material-ui/core";
import { ETHER_UNITS, EtherUnit } from "../../etherium/models";
import { ethers } from "ethers";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "rgba(180,180,180,.1)",
    },
    input: {
      padding: "2px 0",
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    select: {
      padding: "2px 0",
    },
  })
);

type CurrencyInputProps = {
  onChange: (amount: string) => void;
  disabled?: boolean;
};

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  onChange,
  disabled = false,
}) => {
  const classes = useStyles();
  const [amount, setAmount] = useState("0");
  const [unit, setUnit] = useState<EtherUnit>(EtherUnit.wei);

  useEffect(() => {
    onChange(ethers.utils.parseUnits(amount || "0", unit).toString());
  }, [amount, unit]);

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        disabled={disabled}
        type="number"
        className={classes.input}
        placeholder="Amount"
        inputProps={{ "aria-label": "input currency" }}
        value={amount}
        onChange={(evt) => setAmount(evt.target.value)}
      />
      <Select
        disabled={disabled}
        className={classes.select}
        disableUnderline
        autoWidth
        value={unit}
        onChange={(evt) => setUnit(evt.target.value as EtherUnit)}
      >
        {ETHER_UNITS.map((unit) => (
          <MenuItem key={unit} value={unit}>
            {unit}
          </MenuItem>
        ))}
      </Select>
    </Paper>
  );
};
