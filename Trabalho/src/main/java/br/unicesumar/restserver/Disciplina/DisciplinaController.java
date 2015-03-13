package br.unicesumar.restserver.Disciplina;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import org.h2.command.dml.Merge;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mapping.PreferredConstructor;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/disciplinas")
@Transactional
public class DisciplinaController {

    @Autowired
    private EntityManager em;

    @RequestMapping(method = RequestMethod.GET)
    public List<Disciplina> getDisciplinas() {
        Query DisciplinasQuery = em.createQuery("from Disciplina");
        return DisciplinasQuery.getResultList();
    }

    @RequestMapping(method = RequestMethod.POST)
    public void salvarDisciplina(@RequestBody Disciplina novaDisciplina) {
        em.persist(novaDisciplina);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public void deletarDisciplina(@RequestParam Long id) {
        em.remove(id);        
    }

    @RequestMapping(method = RequestMethod.PUT)
    public void alterarDisciplina(@RequestBody Disciplina disciplina) {
        em.merge(disciplina);
    }
}
