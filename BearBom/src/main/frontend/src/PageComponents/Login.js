// import React, { useState } from "react";
// import "../css/login.css";

// import TextField from "@mui/material/TextField";
// import Checkbox from "@mui/material/Checkbox";
// import Button from "@mui/material/Button";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import Typography from "@mui/material/Typography";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Avatar from "@mui/material/Avatar";
// import Box from "@mui/material/Box";
// import Container from "@mui/material/Container";

// const Login = () => {
//   const [userId, setUserId] = useState("");
//   const [userPw, setUserPw] = useState("");

//   return (
//     <>
//       <Container component="main" maxWidth="xs">
//         <form action="">
//           <Box
//             sx={{
//               marginTop: 8,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             {/* 아이콘 */}
//             <Avatar sx={{ m: 1, bgcolor: "gray" }}>
//               <LockOutlinedIcon />
//             </Avatar>
//             <Typography component="h1" variant="h5">
//               로그인1
//             </Typography>
//             <TextField
//               margin="normal"
//               label="아이디"
//               required
//               fullWidth
//               name="userId"
//               autoFocus
//               value={userId}
//               onChange={({ target: { value } }) => setUserId(value)}
//             />
//             <TextField
//               label="비밀번호"
//               type="password"
//               required
//               fullWidth
//               name="userPw"
//               value={userPw}
//               onChange={({ target: { value } }) => setUserPw(value)}
//             />
//             <FormControlLabel
//               control={<Checkbox value="remember" color="primary" />}
//               label="아이디 저장"
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               로그인
//             </Button>
//             <Grid container mb={1}>
//               <Grid item xs>
//                 <Link href="#">비밀번호 찾기</Link>
//               </Grid>
//               <Grid item>
//                 <Link href="join">회원가입</Link>
//               </Grid>
//             </Grid>
//           </Box>

//           <hr />
//           <div className="easy_login_name">간편 로그인</div>
//           <br />
//           <div class="easy_login">
//             <div className="google_login">
//               <a href="https://accounts.google.com/ServiceLogin/identifier?service=accountsettings&continue=https%3A%2F%2Fmyaccount.google.com%3Futm_source%3Daccount-marketing-page%26utm_medium%3Dgo-to-account-button&flowName=GlifWebSignIn&flowEntry=ServiceLogin">
//                 <img
//                   src={require("../img/google_login.png")}
//                   width="50"
//                   height="50"
//                 ></img>
//               </a>
//             </div>
//             <div className="kakao_login">
//               <a href="https://accounts.kakao.com/login?continue=https%3A%2F%2Fcs.kakao.com%2Fhelps%3Fcategory%3D166%26locale%3Dko%26service%3D52">
//                 <img src={require("../img/kakao_login.png")} height="50"></img>
//               </a>
//             </div>
//             <div className="naver_login">
//               <a href="https://nid.naver.com/nidlogin.login">
//                 <img
//                   src={require("../img/naver_login.png")}
//                   width="50"
//                   height="50"
//                 ></img>
//               </a>
//             </div>
//           </div>
//         </form>
//       </Container>
//     </>
//   );
// };

// export default Login;

import React, { useState, useCallback, useEffect } from "react";
import { useCookies } from "react-cookie";
import "../css/login.scss";

import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import axios from "axios";
import { API_BASE_URL } from "../app-config";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  // // Cookie 관련 선언
  // const [cookies, setCookie, removeCookie] = useCookies(["rememberUserId"]); // #Cookies 이름
  // const [isRemember, setIsRemember] = useState(false); // #아이디 저장 체크박스 체크 유무

  // /*페이지가 최초 렌더링 될 경우*/
  // useEffect(() => {
  //   /*저장된 쿠키값이 있으면, CheckBox TRUE 및 UserID에 값 셋팅*/
  //   if (cookies.rememberUserId !== undefined) {
  //     setUserid(cookies.rememberUserId);
  //     setIsRemember(true);
  //   }
  // }, []);

  // const handleOnChange = (e) => {
  //   setIsRemember(e.target.checked);
  //   if (!e.target.checked) {
  //     removeCookie("rememberUserId");
  //   }
  // };

  // 값 저장
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");

  // 아이디 저장
  const [isRemember, setIsRemember] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["rememberEmail"]);

  useEffect(() => {
    if (cookies.rememberEmail !== undefined) {
      setUserId(cookies.rememberEmail);
      setIsRemember(true);
    }
  }, []);

  const handleOnChange = (e) => {
    setIsRemember(e.target.check);
    if (e.target.check) {
      setCookie("rememberEmail", userId, { maxAge: 2000 });
    } else {
      removeCookie("rememberEmail");
    }
  };

  // 오류 메시지 상태 저장
  const [userIdMessage, setUserIdMessage] = useState("");
  const [userPwMessage, setUserPwMessage] = useState("");

  // 유효성 검사
  const [isUserId, setIsUserId] = useState(false);
  const [isUserPw, setIsUserPw] = useState(false);

  const [userInfo, setUserInfo] = useState({});

  const addUserInfo = (e) => {
    const newUserInfo = {
      ...userInfo,
      [e.target.name]: e.target.value,
    };

    setUserInfo(newUserInfo);
  };

  // 아이디 유효성
  const onChangeName = useCallback((e) => {
    setUserId(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 10) {
      setUserIdMessage("2글자 이상 10글자 미만으로 입력해주세요.");
      setIsUserId(false);
    } else {
      setUserIdMessage("올바른 이름 형식입니다.");
      setIsUserId(true);
      addUserInfo(e);
    }
  }, []);

  // 비밀번호 유효성
  const onChangePassword = useCallback((e) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setUserPw(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setUserPwMessage(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
      );
      setIsUserPw(false);
    } else {
      setUserPwMessage("올바른 비밀번호 형식입니다.");
      setIsUserPw(true);
      addUserInfo(e);
    }
  }, []);

  const onChangeUserId = (e) => {
    const userIdCurrent = e.target.value;
    setUserId(userIdCurrent);
  };

  const onChangeUserPw = (e) => {
    const userPwCurrent = e.target.value;
    setUserPw(userPwCurrent);
  };

  const onSubmitLoginHandler = (e) => {
    console.log({
      userId: userId,
      userPw: userPw,
    });
    e.preventDefault();
    axios({
      method: "post",
      url: API_BASE_URL + "/api/user/login",
      data: { userId: userId, userPw: userPw },
    })
      .then((response) => {
        // console.log(response);
        // navigate("/");
        console.log(response);
        localStorage.setItem("USER_ID", response.data.userId);
        if (response.data.token) {
          localStorage.setItem("ACCESS_TOKEN", response.data.token);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <form onSubmit={onSubmitLoginHandler}>
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* 아이콘 */}
            <Avatar sx={{ m: 1, bgcolor: "gray" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              로그인2
            </Typography>

            <Box noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <div className="formbox">
                    <TextField
                      // margin="normal"
                      label="아이디"
                      required
                      fullWidth
                      name="userId"
                      autoFocus
                      value={userId}
                      onChange={onChangeName}
                    />
                    {userId.length > 0 && (
                      <span
                        className={`message ${isUserId ? "success" : "error"}`}
                      >
                        {userIdMessage}
                      </span>
                    )}
                  </div>
                </Grid>

                <Grid item xs={12}>
                  <div className="formbox">
                    <TextField
                      label="비밀번호"
                      type="password"
                      required
                      fullWidth
                      name="userPw"
                      id="userPw"
                      value={userPw}
                      onChange={onChangePassword}
                    />
                    {userPw.length > 0 && (
                      <span
                        className={`message ${isUserPw ? "success" : "error"}`}
                      >
                        {userPwMessage}
                      </span>
                    )}
                  </div>
                </Grid>

                <div id="idsave">
                  <Grid item xs={12}>
                    <FormControlLabel
                      onChange={handleOnChange}
                      // checked={isRemember}
                      control={<Checkbox value="isRemember" color="primary" />}
                      label="아이디 저장"
                    />
                  </Grid>
                </div>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!(isUserId && isUserPw)}
              >
                로그인
              </Button>

              <Grid container mb={1}>
                <Grid item xs>
                  <Link href="#">비밀번호 찾기</Link>
                </Grid>
                <Grid item>
                  <Link href="join">회원가입</Link>
                </Grid>
              </Grid>

              <hr />
              <div className="easy_login_name">간편 로그인</div>
              <br />
              <div class="easy_login">
                <div className="google_login">
                  <a href="https://accounts.google.com/ServiceLogin/identifier?service=accountsettings&continue=https%3A%2F%2Fmyaccount.google.com%3Futm_source%3Daccount-marketing-page%26utm_medium%3Dgo-to-account-button&flowName=GlifWebSignIn&flowEntry=ServiceLogin">
                    <img
                      src={require("../img/google_login.png")}
                      width="50"
                      height="50"
                      alt="google"
                    ></img>
                  </a>
                </div>
                <div className="kakao_login">
                  <a href="https://accounts.kakao.com/login?continue=https%3A%2F%2Fcs.kakao.com%2Fhelps%3Fcategory%3D166%26locale%3Dko%26service%3D52">
                    <img
                      src={require("../img/kakao_login.png")}
                      height="50"
                      width="50"
                      alt="kakao"
                    ></img>
                  </a>
                </div>
                <div className="naver_login">
                  <a href="https://nid.naver.com/nidlogin.login">
                    <img
                      src={require("../img/naver_login.png")}
                      width="50"
                      height="50"
                      alt="naver"
                    ></img>
                  </a>
                </div>
              </div>
            </Box>
          </Box>
        </form>
      </Container>
    </>
  );
};

export default Login;
