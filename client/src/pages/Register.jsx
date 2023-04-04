import styled from "styled-components";
import { useFormik } from "formik";
import { object, string, ref } from "yup";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../apiCalls";
import { useNavigate } from "react-router-dom";
const userSchema = object({
  name: string().min(3).required(),
  email: string().email().required(),
  password: string().min(3).required(),
  confirm_password: string()
    .oneOf([ref("password"), null], "password did not match")
    .required(),
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    userTheme: theme,
    isUserLoading,
    isUserError,
  } = useSelector((state) => state.User);

  const handleSubmit = async (data) => {
    await register(dispatch, data);
    if (!isUserError && !isUserLoading) {
      navigate("/");
    }
    else{
      navigate("/register");
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },

    validationSchema: userSchema,
    onSubmit: handleSubmit,
  });
  return (
    <Container themeMode={theme}>
      <div className="container">
        <div className="left">
          <div className="logo">
            <img src="./images/logo.png" alt="logo" className="src" />
          </div>
          <h2>
            Socialbook helps you connect and share with the people in your life.
          </h2>
        </div>
        <div className="right">
          <form onSubmit={formik.handleSubmit}>
            <label className="input-wrapper">
              <p>
                Name <span className="req">*</span>{" "}
              </p>
              <input
                type="text"
                placeholder="Enter your name"
                id="name"
                {...formik.getFieldProps("name")}
                style={
                  formik.touched.name &&
                  formik.errors.name && { outline: "1px solid red" }
                }
              />
              {formik.touched.name && formik.errors.name && (
                <small style={{ color: "red", textTransform: "capitalize" }}>
                  {formik.errors.name}
                </small>
              )}
            </label>
            <label className="input-wrapper">
              <p>
                Email <span className="req">*</span>
              </p>
              <input
                type="text"
                placeholder="Enter your email"
                id="email"
                {...formik.getFieldProps("email")}
                style={
                  formik.touched.email &&
                  formik.errors.email && { outline: "1px solid red" }
                }
              />
              {formik.touched.email && formik.errors.email && (
                <small style={{ color: "red", textTransform: "capitalize" }}>
                  {formik.errors.email}
                </small>
              )}
            </label>
            <label className="input-wrapper">
              <p>
                Password <span className="req">*</span>
              </p>
              <input
                type="text"
                placeholder="Enter your password"
                id="password"
                {...formik.getFieldProps("password")}
                style={
                  formik.touched.password &&
                  formik.errors.password && { outline: "1px solid red" }
                }
              />
              {formik.touched.password && formik.errors.password && (
                <small style={{ color: "red", textTransform: "capitalize" }}>
                  {formik.errors.password}
                </small>
              )}
            </label>
            <label className="input-wrapper">
              <p>
                Confirm Password <span className="req">*</span>
              </p>
              <input
                type="password"
                placeholder="Enter your password"
                id="confirm_password"
                {...formik.getFieldProps("confirm_password")}
                style={
                  formik.touched.confirm_password &&
                  formik.errors.confirm_password && { outline: "1px solid red" }
                }
              />
              {formik.touched.confirm_password &&
                formik.errors.confirm_password && (
                  <small style={{ color: "red", textTransform: "capitalize" }}>
                    {formik.errors.confirm_password}
                  </small>
                )}
            </label>
            <button className="btn" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.section`
  height: calc(100vh - 20px);
  max-width: ${({ theme }) => theme.screens.xl};
  margin: 0 auto;
  position: relative;
  .container {
    width: 80%;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    align-items: center;
    .left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 2rem;
      padding: 2rem;
      .logo {
        height: 8rem;
        width: 8rem;
        img {
          height: 100%;
          width: 100%;
        }
      }
      h2 {
        line-height: 1.8rem;
        color: ${({ themeMode }) =>
          themeMode === "true" ? "#121212" : "#f2f2f2"};
      }
    }

    .right {
      form {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 1rem;
        background-color: ${({ themeMode, theme }) =>
          themeMode === "true"
            ? theme.colors.lightMode.bgColor
            : theme.colors.darkMode.bgColor};

        width: 75%;
        gap: 1rem;
        border-radius: 0.5rem;
        -webkit-box-shadow: 3px 0px 15px -7px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 3px 0px 15px -7px rgba(0, 0, 0, 0.75);
        box-shadow: 3px 0px 15px -7px rgba(0, 0, 0, 0.75);
        .input-wrapper {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.5rem;
          color: ${({ themeMode }) =>
            themeMode === "true" ? "#121212" : "#f2f2f2"};
          input {
            width: 100%;
            padding: 0.7rem 0.5rem;
            border-radius: 0.4rem;
            border: none;
            color: ${({ themeMode }) =>
              themeMode === "true" ? "#121212" : "#f2f2f2"};
            background-color: ${({ themeMode, theme }) =>
              themeMode === "true"
                ? theme.colors.lightMode.commentBgColor
                : theme.colors.darkMode.commentBgColor};
            &:focus {
              outline: 1px solid #7a51f0;
            }
          }
        }

        .btn {
          border-radius: 0.4rem;
          padding: 0.7rem 0.5rem;
          width: 100%;
          border: none;
          color: white;
          font-size: 1rem;
          background-image: linear-gradient(
            150deg,
            hsl(267deg 83% 60%) 0%,
            hsl(264deg 83% 61%) 39%,
            hsl(261deg 84% 62%) 51%,
            hsl(258deg 84% 62%) 58%,
            hsl(255deg 84% 63%) 62%,
            hsl(252deg 84% 64%) 64%,
            hsl(249deg 84% 65%) 66%,
            hsl(245deg 84% 65%) 67%,
            hsl(242deg 84% 66%) 68%,
            hsl(237deg 85% 65%) 70%,
            hsl(234deg 86% 64%) 71%,
            hsl(230deg 87% 62%) 74%,
            hsl(226deg 88% 61%) 79%,
            hsl(223deg 89% 58%) 86%,
            hsl(219deg 90% 56%) 100%
          );
          cursor: pointer;
        }

        .btn-account {
          margin-top: 1rem;
          border-radius: 0.4rem;
          padding: 0.7rem 0.5rem;
          width: 100%;
          border: none;
          color: white;
          background-color: #36a420;
          cursor: pointer;
          font-size: 1rem;
        }

        .req {
          color: #ff0303;
        }
      }
    }
  }
`;
export default Register;
