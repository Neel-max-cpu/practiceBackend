package com.week4.week4.model;

public class DoctorModel {
    private int id;
    private String name;
    private int noOfK;
    private String k1;
    private String k2;

    public DoctorModel(){};

    public DoctorModel(int id, int noOfK, String k1, String k2){
        this.id = id;
        this.noOfK = noOfK;
        this.k1 = k1;
        this.k2 = k2;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getNoOfK() {
        return noOfK;
    }

    public void setNoOfK(int noOfK) {
        this.noOfK = noOfK;
    }

    public String getK1() {
        return k1;
    }

    public void setK1(String k1) {
        this.k1 = k1;
    }

    public String getK2() {
        return k2;
    }

    public void setK2(String k2) {
        this.k2 = k2;
    }
}
