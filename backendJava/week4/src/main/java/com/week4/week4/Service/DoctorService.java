package com.week4.week4.Service;

import com.week4.week4.Dto.KidneyRequest;
import com.week4.week4.model.DoctorModel;
import org.springframework.stereotype.Service;

import javax.print.Doc;
import java.util.*;

@Service
public class DoctorService {
    private List<DoctorModel> organs = new ArrayList<>();

    private int currentId = 1;

    public List<DoctorModel> getall(){
        return organs;
    }

    public Map<String, Object> getForHisKidneysAndHealth(int id){
        for (DoctorModel organ : organs){
            if(organ.getId() == id){
                Map<String, Object> response = new HashMap<>();
                response.put("noOfKidneys", organ.getNoOfK());
                response.put("kidney1", organ.getK1());
                response.put("kidney2", organ.getK2());
                return response;
            }
        }
        return null;
    }

    public String addKidney(int id, KidneyRequest kidneyRequest){
        for(DoctorModel organ : organs){
            if(organ.getId() == id){
                int count = organ.getNoOfK();
                int kidneyReqCount = kidneyRequest.getCount();
                if(count == 2){
                    return "user already have 2 kidneys";
                }
                else if(count == 1){
                    if(kidneyReqCount>1){
                        return "Can't put more than 2 kidneys!";
                    }
                    else{
                        organ.setK2(kidneyRequest.getK2());
                        organ.setNoOfK(2);
                        return "2nd kidney added!";
                    }
                }
                else if(count == 0){
                    if(kidneyReqCount>1){
                        return "Can't put more than 2 kidneys!";
                    }
                    else{
                        organ.setK1(kidneyRequest.getK1());
                        organ.setK2(kidneyRequest.getK2());;
                        organ.setNoOfK(2);
                        return "2 kidney added";
                    }
                }
            }
        }
        return "User not found";
    }

    public String replaceBad()
}
