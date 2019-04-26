package com.mycompany.myapp.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Supplier.
 */
@Entity
@Table(name = "supplier")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Supplier implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "company")
    private String company;

    @Lob
    @Column(name = "supp_resp")
    private byte[] suppResp;

    @Column(name = "supp_resp_content_type")
    private String suppRespContentType;

    @OneToOne
    @JoinColumn(unique = true)
    private User login;

    @ManyToOne
    @JsonIgnoreProperties("tenderResponses")
    private Tender supplierResponse;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Supplier name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCompany() {
        return company;
    }

    public Supplier company(String company) {
        this.company = company;
        return this;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public byte[] getSuppResp() {
        return suppResp;
    }

    public Supplier suppResp(byte[] suppResp) {
        this.suppResp = suppResp;
        return this;
    }

    public void setSuppResp(byte[] suppResp) {
        this.suppResp = suppResp;
    }

    public String getSuppRespContentType() {
        return suppRespContentType;
    }

    public Supplier suppRespContentType(String suppRespContentType) {
        this.suppRespContentType = suppRespContentType;
        return this;
    }

    public void setSuppRespContentType(String suppRespContentType) {
        this.suppRespContentType = suppRespContentType;
    }

    public User getLogin() {
        return login;
    }

    public Supplier login(User user) {
        this.login = user;
        return this;
    }

    public void setLogin(User user) {
        this.login = user;
    }

    public Tender getSupplierResponse() {
        return supplierResponse;
    }

    public Supplier supplierResponse(Tender tender) {
        this.supplierResponse = tender;
        return this;
    }

    public void setSupplierResponse(Tender tender) {
        this.supplierResponse = tender;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Supplier supplier = (Supplier) o;
        if (supplier.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), supplier.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Supplier{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", company='" + getCompany() + "'" +
            ", suppResp='" + getSuppResp() + "'" +
            ", suppRespContentType='" + getSuppRespContentType() + "'" +
            "}";
    }
}
