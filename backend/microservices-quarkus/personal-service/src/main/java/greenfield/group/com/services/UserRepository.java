package greenfield.group.com.services;

import greenfield.group.com.model.User;

import javax.annotation.PostConstruct;
import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnit;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;


@Transactional
@ApplicationScoped
public class UserRepository implements Repository<User> {

    @PersistenceUnit(unitName = "my-persistence-unit")
    EntityManagerFactory entityManagerFactory;
    EntityManager entityManager;

    @PostConstruct
    public void init() {
        System.out.println("Post construct with entity managerFactory " + entityManagerFactory.toString());
        initEntityManager();
    }

    @Override
    public void initEntityManager() {
        this.entityManager = entityManagerFactory.createEntityManager();
    }

    @Override
    public void create(User model) {
        entityManager.persist(model);
    }

    @Override
    public boolean delete(User model) {
        entityManager.detach(model);
        return true;
    }

    @Override
    public User update(User model) {
        return entityManager.merge(model);
    }

    @Override
    public List<User> findAll() {
        Query query = entityManager.createQuery("select u from User u");
        return query.getResultList();
    }

    @Override
    public boolean isFindByUUID(String originalUUID) {
        if ((originalUUID == null) || (originalUUID.isEmpty())) {
            return true;
        }

        UUID proxyUUID = UUID.fromString(originalUUID);
        Query query = entityManager.createQuery("select u from User u where :uuid");
        query.setParameter("uuid", proxyUUID);
        return query.getResultList().size() != 0;
    }
}
