namespace RPDev.Generic;

public static class ValidationHelpers {
    public static (TObject? givenObject, IEnumerable<TError> errors) BeginValidation<TObject, TError>(this TObject? givenObject) => (givenObject, []);

    public static (TObject? givenObject, IEnumerable<TError> errors) ValidationPass<TObject, TError>(this (TObject? givenObject, IEnumerable<TError> errors) validationState, Func<TObject?, bool> validationFunc, TError errorOnFail) {
        if (!validationFunc(validationState.givenObject)) {
            validationState.errors = validationState.errors.Append(errorOnFail);
        }
        return validationState;
    }

    public static (TObject? givenObject, IEnumerable<TError> errors) IsNotNull<TObject, TError>(this (TObject? givenObject, IEnumerable<TError> errors) validationState, TError errorOnFail) {
        return validationState.ValidationPass((TObject? givenObject) => givenObject is not null, errorOnFail);
    }

    public static IEnumerable<TError> Collect<TObject, TError>(this (TObject? givenObject, IEnumerable<TError> errors) validationState) => validationState.errors;

    // Does nothing, but indicates that no validation is needed.
    public static TObject NoValidation<TObject>(this TObject givenObject) => givenObject;
}