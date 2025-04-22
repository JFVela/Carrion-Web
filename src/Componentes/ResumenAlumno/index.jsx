// componentes/InfoResumen.jsx
import { Box, Grid, Typography, CardContent } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import ClassIcon from "@mui/icons-material/Class";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GroupIcon from "@mui/icons-material/Group";
import {
  SummaryContainer,
  InstitutionName,
  AcademicYear,
  StudentAvatar,
  StudentName,
  StudentId,
  InfoCard,
  InfoLabel,
  InfoValue,
  MeritChip,
} from "../estilos";
import { COLORS } from "../constantes";

const getGradeColor = (grade) => {
  if (grade <= 12) return COLORS.error;
  if (grade <= 15) return COLORS.warning;
  return COLORS.success;
};

export default function InfoResumen({ student }) {
  const topPercentage = Math.round((student.meritRank / student.totalStudents) * 100);

  return (
    <SummaryContainer elevation={0}>
      <InstitutionName variant="h4">{student.institution}</InstitutionName>
      <AcademicYear variant="subtitle1">Año Académico {student.academicYear}</AcademicYear>

      <Box sx={{ mb: 4, textAlign: "center" }}>
        <StudentAvatar src={student.photoUrl} alt={student.studentName} sx={{ width: 100, height: 100 }} />
        <StudentName variant="h5">{student.studentName}</StudentName>
        <StudentId variant="body2">{student.studentId}</StudentId>
      </Box>

      <Typography variant="h6" sx={{ mb: 2 }}>
        Resumen Académico
      </Typography>

      <Grid container spacing={0} sx={{ gap: "15px", flexWrap: "wrap" }}>
        <Grid item xs={12} sm={5.9}>
          <InfoCard>
            <CardContent>
              <InfoLabel><SchoolIcon /> Grado</InfoLabel>
              <InfoValue>{student.grade}</InfoValue>
              <InfoLabel sx={{ mt: 3 }}><ClassIcon /> Sección</InfoLabel>
              <InfoValue>{student.section}</InfoValue>
            </CardContent>
          </InfoCard>
        </Grid>

        <Grid item xs={12} sm={5.9}>
          <InfoCard>
            <CardContent>
              <InfoLabel><EmojiEventsIcon /> Orden de Mérito</InfoLabel>
              <InfoValue>{student.meritRank} de {student.totalStudents}</InfoValue>
              <Box sx={{ pl: 3.5 }}>
                <MeritChip label={`Top ${topPercentage}%`} size="small" />
              </Box>

              <InfoLabel sx={{ mt: 3 }}><GroupIcon /> Promedio General</InfoLabel>
              <InfoValue sx={{ color: getGradeColor(student.averageGrade) }}>
                {student.averageGrade}
              </InfoValue>
            </CardContent>
          </InfoCard>
        </Grid>
      </Grid>
    </SummaryContainer>
  );
}
