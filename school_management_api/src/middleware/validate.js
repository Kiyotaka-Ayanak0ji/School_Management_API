const {body,query,validationResult} = require('express-validator');

const addSchoolValidation = [
    body("name").
    trim().
    notEmpty().
    withMessage("School Name is required")
    .isLength({min: 2 , max: 255})
    .withMessage("School Name must be at least 2-255 characters long"),

    body("address").
    trim().
    notEmpty().
    withMessage("Address is required")
    .isLength({min: 5 , max: 500})
    .withMessage("Address must be at least 5-500 characters long"),

    body("latitude")
    .notEmpty()
    .withMessage("Latitude is required")
    .isFloat({min: -90, max: 90})
    .withMessage("Latitude must be between -90 and 90"),

    body("logitude").
    notEmpty().
    withMessage("Longitude is required")
    .isFloat({min: -180, max: 180})
    .withMessage("Longitude must be between -180 and 180"),
];

const listSchoolsValidation = [
    query("latitude").
    notEmpty().
    withMessage("Latitude is required")
    .isFloat({min: -90, max: 90})
    .withMessage("Latitude must be between -90 and 90"),

    query("logitude").
    notEmpty().
    withMessage("Longitude is required")
    .isFloat({min: -180, max: 180})
    .withMessage("Longitude must be between -180 and 180")
];

const handleValidationErrors = (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            success: false,
            message: "Validation Failed",
            errors: errors.array().map((e) => {
                field: e.path;
                message: e.msg
            })
        })
    }
    next();
}

module.exports = { addSchoolValidation , listSchoolsValidation, handleValidationErrors };