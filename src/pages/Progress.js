import React, { useState, useEffect } from "react";
import { connect } from "dva";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles(theme => {
  return {
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2)
      }
    },
    container: {
      width: "100%",
      height: "100%",
      margin: "auto",
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "#000000",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    mainContainer: {
      width: 600,
      padding: theme.spacing(1)
    },
    controlBar: {
      padding: "20px 0",
      display: "flex",
      justifyContent: "space-around"
    },
    dropdown: {
      flex: "2 1 auto"
    },
    btnGroup: {
      flex: "1 1 auto",
      paddingLeft: 10
    },
    btn: {
      marginRight: 5,
      "&:last-child": {
        marginRight: 0
      }
    },
    barWrapper: {
      position: "relative"
    },
    barLa: {
      position: "absolute",
      color: "#000000", // black
      fontWeight: 800,
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)"
    },
    "@global": {
      ".MuiSelect-outlined.MuiSelect-outlined": {
        backgroundColor: "#e0e0e0",
        paddingTop: 9,
        paddingBottom: 9
      },
      ".MuiLinearProgress-root": {
        height: 40,
        backgroundColor: "#fffeff" // white
      },
      ".MuiLinearProgress-bar": {
        backgroundColor: "#b2d7e6" // blue
      },
      ".errBar .MuiLinearProgress-bar": {
        backgroundColor: "#ff5650 !important" // red
      }
    }
  };
});

function Progress(props) {
  const classes = useStyles();
  const { dispatch } = props;
  const [targetBar, setTargetBar] = useState("progress1");
  const [progressBars, setProgressBars] = useState({});
  const [errorState, setErrorState] = useState({});
  const [btnArr, setBtnArr] = useState([]);
  const [limit, setLimit] = useState([]);

  useEffect(() => {
    dispatch({
      type: "progress/initData"
    }).then(res => {
      if (res && res.data) {
        const dataSource = res.data;
        console.log("data-------", dataSource);
        const barArr = [];
        for (const k in dataSource.bars) {
          const val = dataSource.bars[k];
          barArr[`progress${Number(k) + 1}`] = (val * 100) / dataSource.limit;
        }
        setProgressBars(barArr);
        setBtnArr(dataSource.buttons);
        setLimit(dataSource.limit);
      } else if (res) {
        console.log("error-------", res);
      }
    });
  }, [dispatch]);

  const handleChangeTarget = e => {
    const { value } = e.target;
    setTargetBar(value);
  };

  function handleChangeProgressVal(val) {
    setProgressBars(pre => {
      const result = (pre[targetBar] * limit) / 100 + val;
      if (result <= 0) {
        return { ...pre, [targetBar]: 0 };
      } else if (result > limit) {
        setErrorState(pre => {
          return { ...pre, [targetBar]: true };
        });
      } else if (result <= limit) {
        setErrorState(pre => {
          return { ...pre, [targetBar]: false };
        });
      }
      return { ...pre, [targetBar]: (result * 100) / limit };
    });
  }

  return (
    <div className={classes.container}>
      <div elevation={0} className={classes.mainContainer}>
        <div className={classes.root}>
          {Object.keys(progressBars).map(item => {
            return (
              <div key={item} className={classes.barWrapper}>
                <LinearProgress
                  variant="determinate"
                  value={progressBars[item] >= 100 ? 100 : progressBars[item]}
                  className={errorState[item] ? "errBar" : ""}
                />
                <span className={classes.barLa}>
                  {`${progressBars[item].toFixed(1)}%`}
                </span>
              </div>
            );
          })}
        </div>
        <div className={classes.controlBar}>
          <FormControl variant="outlined" className={classes.dropdown}>
            <Select
              id="demo-simple-select"
              className={classes.select}
              value={targetBar}
              onChange={handleChangeTarget}
            >
              {Object.keys(progressBars).map(option => {
                return (
                  <MenuItem key={option} value={option}>
                    {`#${option}`}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <div className={classes.btnGroup}>
            {btnArr.map(num => {
              return (
                <Button
                  key={num}
                  onClick={() => handleChangeProgressVal(num)}
                  className={classes.btn}
                  variant="contained"
                >
                  {num > 0 ? `+${num}` : num}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default connect(({ progress }) => ({ progress }))(Progress);
