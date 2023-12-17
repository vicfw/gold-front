import { Dialog } from "@/components/ui/dialog";
import { ReactNode } from "react";

interface IConfirmModal {
  openModal: boolean;
  toggleModalHandler: () => void;
  children: ReactNode;
}

const ConfirmModal = (props: IConfirmModal) => {
  const { openModal, toggleModalHandler, children } = props;
  return (
    <Dialog open={openModal} onOpenChange={toggleModalHandler}>
      {children}
    </Dialog>
  );
};

export default ConfirmModal;
