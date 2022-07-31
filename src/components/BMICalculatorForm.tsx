import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material"

import { Box } from "@mui/system"
import React from "react"
import axios from "axios"
import { useState } from "react"

const BMICalculatorForm = () => {
    const measurementUnitConfig: {
        [key: string]: {
            height: string,
            heightSecondary?: string,
            weight: string,
        }
    } = {
        METRIC: {
            height: "Height (cm)",
            weight: "Weight (kgs)",
        },

        STANDARD: {
            height: "Height (ft)",
            heightSecondary: "Height (in)",
            weight: "Weight (lbs)",
        },
    }

    const [measurementUnit, setMeasurementUnit] = useState<string>("STANDARD")
    const [height, setHeight] = useState<string>("")
    const [heightSecondary, setHeightSecondary] = useState<string>("")
    const [weight, setWeight] = useState<string>("")

    const [bmi, setBMI] = useState(null)
    const [classification, setClassification] = useState(null)

    const [errors, setErrors] = useState<{
        [key: string]: string
    }>({})

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()

        const payload: {
            measurementUnit: string,
            height: number,
            heightSecondary?: number
            weight: number,
        } = {
            measurementUnit: measurementUnit,
            height: +height,
            weight: +weight,
        }

        if (measurementUnit === "STANDARD") {
            payload.heightSecondary = +heightSecondary
        }

        axios
            .post("/v1/bmi", payload)
            .then((res) => {
                setBMI(res.data.bmi)
                setClassification(res.data.classification)
            })
            .catch((err) => {
                switch (err.response.status) {
                    case 400:
                        setErrors(err.response.data)
                        break
                    default:
                        return
                }
            })
    }

    return (
        <form onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{ mb: 2 }}>
                <FormLabel id="measurement-unit">Measurement Unit</FormLabel>
                <RadioGroup
                    row
                    aria-labelledby="measurement-unit"
                    name="measurement-unit-radio-grp"
                    value={measurementUnit}
                    onChange={(e) => setMeasurementUnit(e.target.value)}
                >
                    <FormControlLabel
                        value="STANDARD"
                        control={<Radio />}
                        label="Standard"
                    />
                    
                    <FormControlLabel
                        value="METRIC"
                        control={<Radio />}
                        label="Metric"
                    />
                </RadioGroup>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                    label={measurementUnitConfig[measurementUnit].height}
                    error={errors["height"] ? true : false}
                    helperText={errors["height"]}
                    type="number"
                    variant="outlined"
                    value={height}
                    onChange={(e) => {
                        delete errors["height"]
                        setErrors(errors)
                        setHeight(e.target.value)
                    }}
                />
            </FormControl>

            {measurementUnitConfig[measurementUnit].heightSecondary && (
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField
                        error={errors["heightSecondary"] ? true : false}
                        helperText={errors["heightSecondary"]}
                        label={
                            measurementUnitConfig[measurementUnit]
                                .heightSecondary
                        }
                        type="number"
                        variant="outlined"
                        value={heightSecondary}
                        onChange={(e) => {
                            delete errors["heightSecondary"]
                            setErrors(errors)
                            setHeightSecondary(e.target.value)
                        }}
                    ></TextField>
                </FormControl>
            )}

            <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                    error={errors["weight"] ? true : false}
                    helperText={errors["weight"]}
                    label={measurementUnitConfig[measurementUnit].weight}
                    type="number"
                    variant="outlined"
                    value={weight}
                    onChange={(e) => {
                        delete errors["weight"]
                        setErrors(errors)
                        setWeight(e.target.value)
                    }}
                />
            </FormControl>

            <Button
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                sx={{
                    mb: 2,
                }}
            >
                Compute
            </Button>

            {bmi !== null && classification && (
                <Box>
                    <Typography variant="h6" sx={{ textAlign: "center" }}>
                        BMI is {bmi} ({classification})
                    </Typography>
                </Box>
            )}
        </form>
    )
}

export default BMICalculatorForm
