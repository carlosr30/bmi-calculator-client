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
import axios from "axios"
import { useState } from "react"

const BMICalculatorForm = () => {
    const measurementUnitConfig = {
        M_AND_KG: {
            height: "Height (m)",
            weight: "Weight (kgs)",
        },

        FT_IN_AND_LBS: {
            height: "Height (ft)",
            heightSecondary: "Height (in)",
            weight: "Weight (lbs)",
        },
    }

    const [measurementUnit, setMeasurementUnit] = useState("FT_IN_AND_LBS")
    const [height, setHeight] = useState("")
    const [heightSecondary, setHeightSecondary] = useState("")
    const [weight, setWeight] = useState("")

    const [bmi, setBMI] = useState(null)
    const [classification, setClassification] = useState(null)

    const [errors, setErrors] = useState({})

    const handleSubmit = (e) => {
        e.preventDefault()

        const payload = {
            measurementUnit: measurementUnit,
            height: height,
            weight: weight,
        }

        if (measurementUnit === "FT_IN_AND_LBS") {
            payload.heightSecondary = heightSecondary
        }

        axios
            .post("http://localhost:4000/api/v1/bmi", payload)
            .then((res) => {
                setBMI(res.data.bmi)
                setClassification(res.data.classification)
            })
            .catch((err) => {
                setErrors(err.response.data)
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
                        value="M_AND_KG"
                        control={<Radio />}
                        label="Metric"
                    />

                    <FormControlLabel
                        value="FT_IN_AND_LBS"
                        control={<Radio />}
                        label="Standard"
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
