import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, TextField, Grid, Box, Typography } from "@mui/material"; // Importa los componentes de Material-UI
import { useTasks } from "../context/tasksContext";
import { useForm } from "react-hook-form";


dayjs.extend(utc);

export function TaskFormPage() {
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (params.id) {
        updateTask(params.id, {
          ...data,
          date: dayjs.utc(data.date).format(),
          time: data.time,
          location: data.location,
        });
      } else {
        createTask({
          ...data,
          date: dayjs.utc(data.date).format(),
          time: data.time,
          location: data.location,
        });
      }

      // navigate("/tasks");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue("date", task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : "");
        setValue("time", task.time || "");
        setValue("location", task.location || "");
        setValue("completed", task.completed);
      }
    };
    loadTask();
  }, []);

  return (
    <Box sx={{ width: '100%', maxWidth: 600, margin: 'auto', padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        {params.id ? "Editar Evento" : "Crear Evento"}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre del Evento"
              variant="outlined"
              {...register("title")}
              error={!!errors.title}
              helperText={errors.title && "Por favor ingresa un título"}
              autoFocus
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descripción"
              variant="outlined"
              multiline
              rows={3}
              {...register("description")}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Fecha"
              type="date"
              variant="outlined"
              {...register("date")}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Hora"
              type="time"
              variant="outlined"
              {...register("time")}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Ubicación"
              variant="outlined"
              {...register("location")}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Guardar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
