import type FormState from "./formState.interface";

type FileStatus = "error" | "done" | "loading";
type SubmitStatus = "idle" | "sending" | "success";

type FieldName = keyof FormState;
type Errors = Partial<Record<FieldName, string>>;

/** Направление появления в Reveal. */
type RevealDirection = "up" | "down" | "left" | "right" | "none" | "zoom";

export type {
    FileStatus, SubmitStatus, Errors, RevealDirection
}