/* eslint no-shadow: [2, { "allow": ["error", "login"] }] */
/* eslint-env es6 */
import React from 'react'
import {
  Paper,
  Grid,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core'
import { Face, Fingerprint } from '@material-ui/icons'
import { useForm } from 'react-hook-form'
import DummyComponent from 'bluecell-themes'
import { useAuth } from '@context/auth-context'
import useAsync from '@utils/api-sync'

function login() {
  const { register, handleSubmit } = useForm()
  const { isLoading, isError, error, run } = useAsync()
  const { login } = useAuth()

  const onSubmit = (data) => {
    run(login(data))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
      >
        <Paper>
          <div style={{ padding: 20 }}>
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item>
                <Face />
              </Grid>
              <Grid item md sm xs>
                <DummyComponent />
                <TextField
                  name="email"
                  id="email"
                  label="Email"
                  type="email"
                  fullWidth
                  autoFocus
                  inputRef={register}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item>
                <Fingerprint />
              </Grid>
              <Grid item md sm xs>
                <TextField
                  name="password"
                  id="password"
                  label="Password"
                  type="password"
                  fullWidth
                  inputRef={register}
                />
              </Grid>
            </Grid>
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="Remember me"
                />
              </Grid>
              <Grid item>
                <Button
                  disableFocusRipple
                  disableRipple
                  style={{ textTransform: 'none' }}
                  variant="text"
                  color="primary"
                >
                  Forgot password ?
                </Button>
              </Grid>
            </Grid>
            <Grid container justify="center" style={{ marginTop: '10px' }}>
              {!isLoading ? (
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ textTransform: 'none' }}
                  type="submit"
                >
                  Login
                </Button>
              ) : (
                `loading`
              )}
              {isError ?? error.message}
            </Grid>
          </div>
        </Paper>
      </Grid>
    </form>
  )
}

export default login
