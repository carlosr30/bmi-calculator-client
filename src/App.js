import {
    Card,
    CardContent,
    Container,
    CssBaseline,
    Grid,
    Typography,
} from "@mui/material"

import BMICalculatorForm from "./components/BMICalculatorForm"
import React from "react"

const App = () => {
    return (
        <Container maxwidth="lg">
            <CssBaseline />

            <Grid
                container
                justifyContent="center"
                alignItems="center"
                sx={{ minHeight: "100vh" }}
            >
                <Grid item xs={12} md={4}>
                    <Card sx={{
                        background: 'lightblue'
                    }}>
                        <CardContent>
                            <Typography
                                align="center"
                                sx={{ mb: 2 }}
                                variant="h2"
                            >
                                BMI Calculator
                            </Typography>

                            <BMICalculatorForm />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default App
