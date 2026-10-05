# conda actviate R

library(tidyverse)

week1 <- data.frame(
  "Week" = rep(1, 12),
  "Overall" = c(
  "Excellent",
  "Good",
  "Excellent",
  "Very Good",
  "Excellent",
  "Excellent",
  "Good",
  "Excellent",
  "Excellent",
  "Very Good",
  "Excellent",
  "Fair"
))
week2 <- data.frame(
  "Week" = rep(2, 3),
  "Overall" = c(
  "Excellent",
  "Excellent",
  "Very Good"
  ))
week3 <- data.frame(
  "Week" = rep(3, 11),
  "Overall" = c("Excellent",
  "Excellent",
  "Excellent",
  "Very Good",
  "Very Good",
  "Very Good",
  "Very Good",
  "Excellent",
  "Excellent",
  "Excellent",
  "Excellent"
  ))

bind_rows(week1, week2, week3) |>
  mutate(Overall = factor(Overall, levels = c("Fair", "Good", "Very Good", "Excellent"))) |>
  #filter(Week == 3) |>
  count(Overall) |>
  mutate(p = n / sum(n))

bind_rows(week1, week2, week3) |>
  mutate(Overall = factor(Overall, levels = c("Fair", "Good", "Very Good", "Excellent"))) |>
  ggplot(aes(x = Overall)) +
  geom_bar() +
  theme_minimal() +
  xlab("Overall student feedback rating")

ggsave("2026Feedback.png", dpi = 300)
