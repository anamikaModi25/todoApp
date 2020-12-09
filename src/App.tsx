import * as React from "react"
import { BrowserRouter, HashRouter, Route, Router, Switch } from "react-router-dom";
import { createBrowserHistory } from 'history';
import { FreeRoute } from "./Configuration/routes";
import { Header } from "./UniversalComponent/Header/header";

let history = createBrowserHistory();

export const App = () => (
  <HashRouter>
    <React.Suspense fallback="...Loading">
      <Route path="*" component={Header} />
      <Switch>
        {FreeRoute.map((routes, i) =>
          <Route key={i} exact={routes.exact} path={routes.path} component={routes.component} />
        )}
      </Switch>
    </React.Suspense>
  </HashRouter>
)


// {/* <ChakraProvider theme={theme}>
//     <Box textAlign="center" fontSize="xl">
//       <Grid minH="100vh" p={3}>
//         <ColorModeSwitcher justifySelf="flex-end" />
//         <VStack spacing={8}>
//           <Logo h="40vmin" pointerEvents="none" />
//           <Text>
//             Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
//           </Text>
//           <Link
//             color="teal.500"
//             href="https://chakra-ui.com"
//             fontSize="2xl"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn Chakra
//           </Link>
//         </VStack>
//       </Grid>
//     </Box>
//   </ChakraProvider> */}