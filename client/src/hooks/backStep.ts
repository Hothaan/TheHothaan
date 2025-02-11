import { imageNameStore } from "@store/imageNameStore";
import { imageUrlStore } from "@store/imageUrlStore";
import { pngStore } from "@store/pngStore";
import { jpgStore } from "@store/jpgStore";
import { pdfStore } from "@store/pdfStore";
import { featureDataStore } from "@store/featureDataStore";
import { projectDataStore } from "@store/projectDataStore";
import { projectIdStore } from "@store/projectIdStore";
import { serviceDataStore } from "@store/serviceDataStore";

class Step5to4 {
  removePng() {
    const { setPng } = pngStore();
    setPng(null);
  }

  removeJpg() {
    const { setJpg } = jpgStore();
    setJpg(null);
  }

  removePdf() {
    const { setPdf } = pdfStore();
    setPdf(null);
  }

  execute() {
    this.removePng();
    this.removeJpg();
    this.removePdf();
  }
}

class Step4to3 extends Step5to4 {
  removeImageName() {
    const { setImageName } = imageNameStore();
    setImageName([]);
  }

  removeImageUrl() {
    const { setImageUrl } = imageUrlStore();
    setImageUrl([]);
  }

  execute() {
    super.execute();
    this.removeImageName();
    this.removeImageUrl();
  }
}

class Step3to2 extends Step4to3 {
  removeProejctData() {
    const { setProjectData } = projectDataStore();
    setProjectData(null);
  }
  removeProejctId() {
    const { setProjectId } = projectIdStore();
    setProjectId(null);
  }
  execute() {
    super.execute();
    this.removeProejctData();
    this.removeProejctId();
  }
}

class Step2to1 extends Step3to2 {
  removeServiceData() {
    const { setServiceData } = serviceDataStore();
    setServiceData(null);
  }
  execute() {
    super.execute();
    this.removeServiceData();
  }
}

// ✅ store를 인자로 전달받도록 변경
const removePng = (setPng: (value: any) => void) => {
  setPng(null);
};

const removeJpg = (setJpg: (value: any) => void) => {
  setJpg(null);
};

const removePdf = (setPdf: (value: any) => void) => {
  setPdf(null);
};

const removeImageName = (setImageName: (value: any) => void) => {
  setImageName([]);
};

const removeImageUrl = (setImageUrl: (value: any) => void) => {
  setImageUrl([]);
};

const removeProjectData = (setProjectData: (value: any) => void) => {
  setProjectData(null);
};

const removeProjectId = (setProjectId: (value: any) => void) => {
  setProjectId(null);
};

const removeServiceData = (setServiceData: (value: any) => void) => {
  setServiceData(null);
};

const removeFeatureData = (setFeatureData: (value: any) => void) => {
  setFeatureData(null);
};

// ✅ composeSteps를 통해 실행 함수 조합
const composeSteps =
  (...steps: (() => void)[]) =>
  () => {
    steps.forEach((step) => step());
  };

// ✅ 실행할 때 store를 가져와서 호출하는 방식으로 변경
const useStep5to4 = () => {
  const { setPng } = pngStore();
  const { setJpg } = jpgStore();
  const { setPdf } = pdfStore();

  return composeSteps(
    () => removePng(setPng),
    () => removeJpg(setJpg),
    () => removePdf(setPdf)
  );
};

const useStep4to3 = () => {
  const step5to4 = useStep5to4();
  const { setFeatureData } = featureDataStore();
  const { setImageName } = imageNameStore();
  const { setImageUrl } = imageUrlStore();
  const { setProjectId } = projectIdStore();

  return composeSteps(
    step5to4,
    () => removeImageName(setImageName),
    () => removeImageUrl(setImageUrl),
    () => removeFeatureData(setFeatureData),
    () => removeProjectId(setProjectId)
  );
};

const useStep3to2 = () => {
  const step4to3 = useStep4to3();
  const { setProjectData } = projectDataStore();

  return composeSteps(step4to3, () => removeProjectData(setProjectData));
};

const useStep2to1 = () => {
  const step3to2 = useStep3to2();
  const { setServiceData } = serviceDataStore();

  return composeSteps(step3to2, () => removeServiceData(setServiceData));
};

export { useStep2to1, useStep3to2, useStep4to3, useStep5to4 };

// export { Step2to1, Step3to2, Step4to3, Step5to4 };
