const timeFunct = (POST_TIME_STAMP) => {
  let time = "";
  if (POST_TIME_STAMP) {
    if (
      (new Date().getTime() -
        new Date(POST_TIME_STAMP.seconds * 1000).getTime()) /
        (1000 * 24 * 3600) >
      1
    ) {
      if (
        Number.parseInt(
          (new Date().getTime() -
            new Date(POST_TIME_STAMP.seconds * 1000).getTime()) /
            (1000 * 24 * 3600)
        ) === 1
      ) {
        time = `yd`;
      } else {
        time = `
              ${Number.parseInt(
                (new Date().getTime() -
                  new Date(POST_TIME_STAMP.seconds * 1000).getTime()) /
                  (1000 * 24 * 3600)
              )} d`;
      }
    } else {
      if (
        (new Date().getTime() -
          new Date(POST_TIME_STAMP.seconds * 1000).getTime()) /
          (1000 * 3600) <
        1
      ) {
        if (
          (new Date().getTime() -
            new Date(POST_TIME_STAMP.seconds * 1000).getTime()) /
            (1000 * 60) <
          1
        ) {
          if (
            (new Date().getTime() -
              new Date(POST_TIME_STAMP.seconds * 1000).getTime()) /
              (1000 * 60) <
            1
          ) {
            if (
              (new Date().getTime() -
                new Date(POST_TIME_STAMP.seconds * 1000).getTime()) /
                (1000 * 60) <
              1
            ) {
              if (
                (new Date().getTime() -
                  new Date(POST_TIME_STAMP.seconds * 1000).getTime()) /
                  (1000 * 60) <
                1
              ) {
                if (
                  (new Date().getTime() -
                    new Date(POST_TIME_STAMP.seconds * 1000).getTime()) /
                    (1000 * 60) <
                  1
                ) {
                  if (
                    (new Date().getTime() -
                      new Date(POST_TIME_STAMP.seconds * 1000).getTime()) /
                      1000 <
                    1
                  ) {
                    time = " now";
                  } else {
                    if (
                      Number.parseInt(
                        (new Date().getTime() -
                          new Date(POST_TIME_STAMP.seconds * 1000).getTime()) /
                          1000
                      ) === 1
                    ) {
                      time = "1s";
                    } else {
                      time = ` ${Number.parseInt(
                        (new Date().getTime() -
                          new Date(POST_TIME_STAMP.seconds * 1000).getTime()) /
                          1000
                      )} s`;
                    }
                  }
                } else {
                  if (
                    Number.parseInt(
                      (new Date().getTime() -
                        new Date(POST_TIME_STAMP.seconds * 1000).getTime()) /
                        (1000 * 60)
                    ) === 1
                  ) {
                    time = "1 m";
                  } else {
                    time = ` ${Number.parseInt(
                      (new Date().getTime() -
                        new Date(POST_TIME_STAMP.seconds * 1000).getTime()) /
                        (1000 * 60)
                    )} m`;
                  }
                }
              } else {
                if (
                  Number.parseInt(
                    (new Date().getTime() -
                      new Date(POST_TIME_STAMP.seconds * 1000).getTime()) /
                      (1000 * 3600)
                  ) === 1
                ) {
                  time = "1 hr";
                } else {
                  time = ` ${Number.parseInt(
                    (new Date().getTime() -
                      new Date(POST_TIME_STAMP.seconds * 1000).getTime()) /
                      (1000 * 3600)
                  )} hr`;
                }
              }
            }
          } else {
            time = "now";
          }
        }
      }
    }
  }
  return time;
};
export default timeFunct;
