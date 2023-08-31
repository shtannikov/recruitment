import React, {FC, ReactNode} from 'react';
import { NavMenu } from './NavMenu';
import {Container, Grid} from "@mui/material";
import {Sidebar} from "../sidebar/Sidebar";

interface LayoutProps {
    children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
    return (
      <div>
          <NavMenu />
          <Grid container direction="row" width={"100vw"} height={"90vh"} wrap="nowrap" sx={{ overflow: "auto" }}>
              <Grid item xs={3} borderRight={1} borderColor={'divider'} paddingLeft={4} paddingRight={1} paddingTop={2} minWidth={"310px"}>
                  <Sidebar/>
              </Grid>
              <Grid item xs={9} minWidth={"600px"}>
                  <Container>
                      {children}
                  </Container>
              </Grid>
          </Grid>
      </div>
    );
}
