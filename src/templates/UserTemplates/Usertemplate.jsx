import { useEffect } from "react";
import { Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
export const UserTemplates = (props) => {
  const { Component, ...restProps } = props;
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        // propsRoute trả ra props.localtion ,props.match, props.hisrory
        return (
          <>
            <div className="form-bg">
              <div className="container">
                <div className="row">
                  <div className="col-md-offset-12 col-md-12 col-sm-offset-12 col-sm-12">
                    <div className="form-container">
                      <Component {...propsRoute} />
                      <div className="backhome">
                        <NavLink to="/">
                          <img
                            src="http://tixvn.click/static/media/logo.af00d8dd04677a4ee789.png"
                            alt-=".."
                          />
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      }}
    />
  );
};
