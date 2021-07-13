# code example

- `Link` should refer to the paths `Route` matched by `Switch`
        <Router>
            <Link />
            ...
            <Switch>
                <Route>
                <Component />
                </Route>
            </Switch>
        </Router>
- cannot use `forEach` to generate `Component`

- `Component` can use `fecth` API to fetch data from server. 
  - Dynamic updates are finished by `useEffect()`