import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import {Grid} from "@mui/material";
import {Sidebar} from "./Sidebar";

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
          <NavMenu />
          <Grid container direction="row" width={"100vw"} height={"90vh"} wrap="nowrap" sx={{ overflow: "auto" }}>
              <Grid item xs={3} borderRight={1} borderColor={'divider'} paddingLeft={4} paddingTop={2} minWidth={"300px"}>
                  <Sidebar/>
              </Grid>
              <Grid item xs={9} minWidth={"600px"}>
                  <Container tag="main">
                      {this.props.children}
                  </Container>
              </Grid>
          </Grid>
      </div>
    );
  }
}
